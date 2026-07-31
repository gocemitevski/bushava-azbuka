// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .catch(function (err) {
        console.error('Service worker registration failed:', err);
      });
  });
}

(function () {
  'use strict';

  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const log = isDev ? console.log.bind(console) : function () {};
  const error = console.error.bind(console);

  const audioBtn = document.getElementById('audio');
  const videoEl = document.getElementById('video');
  const buttonShare = document.querySelector('.btn-share');
  const navbarContent = document.getElementById('navbarSupportedContent');

  // Initialize audio state
  if (localStorage.getItem('isUnmuted') === null) {
    localStorage.setItem('isUnmuted', '0');
  }

  // Share button handler
  if (buttonShare) {
    // Show share button if supported
    if (navigator.share) {
      buttonShare.classList.remove('d-none');
    }

    buttonShare.addEventListener('click', function () {
      if (navigator.share) {
        const descriptionEl = document.querySelector('meta[name="description"]');
        navigator.share({
          title: document.title,
          text: descriptionEl ? descriptionEl.getAttribute('content') : '',
          url: document.location.href
        })
          .then(function () {
            log('Successful share');
          })
          .catch(function (err) {
            error('Error sharing:', err);
          });
      } else {
        alert('Извинете, вашиот прелистувач не ја поддржува оваа можност.');
      }
    });
  }

  // Navigation button handlers
  document.addEventListener('click', function (e) {
    const navBtn = e.target.closest('.btn-nav');
    if (navBtn) {
      e.preventDefault();
      switchLetter(navBtn.getAttribute('href'));
    }

    const navLink = e.target.closest('.navbar-nav .nav-link');
    if (navLink) {
      e.preventDefault();
      markNavItem(navLink);
      switchLetter(navLink.getAttribute('href'));
    }
  });

  // Audio toggle handler
  if (audioBtn && videoEl) {
    audioBtn.addEventListener('click', function () {
      if (videoEl.muted) {
        videoEl.muted = false;
        localStorage.setItem('isUnmuted', '1');
      } else {
        videoEl.muted = true;
        localStorage.setItem('isUnmuted', '0');
      }
      audioIconToggle();
    });
  }

  // Modal handlers - use namespaced events to prevent duplicates
  document.addEventListener('show.bs.modal', function (e) {
    if (e.target.id !== 'videoEpizoda') {
      return;
    }

    if (videoEl) {
      videoEl.muted = true;
    }
    if (audioBtn) {
      audioBtn.classList.remove('on');
    }

    const videoPlaceholder = document.getElementById('videoPlaceholder');
    if (!videoPlaceholder) {
      return;
    }
    const existingIframe = document.getElementById('videoIframe');
    if (existingIframe) {
      existingIframe.remove();
    }

    const videoIframe = document.createElement('iframe');
    videoIframe.id = 'videoIframe';
    videoIframe.width = 560;
    videoIframe.height = 315;
    videoIframe.src = encodeURI(videoPlaceholder.getAttribute('data-src'));
    videoIframe.frameBorder = '0';
    videoIframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    videoIframe.allowFullscreen = true;

    videoPlaceholder.parentElement.appendChild(videoIframe);
  });

  document.addEventListener('hide.bs.modal', function (e) {
    if (e.target.id !== 'videoEpizoda') {
      return;
    }

    const isUnmuted = localStorage.getItem('isUnmuted');
    const iframe = document.getElementById('videoIframe');

    if (isUnmuted === '1' && videoEl) {
      videoEl.muted = false;
      audioIconToggle();
    }

    if (iframe) {
      iframe.remove();
    }
  });

  // Browser back/forward handler
  window.addEventListener('popstate', function (e) {
    if (e.state) {
      document.title = e.state.title;
      const contentEl = document.getElementById('content');
      if (contentEl) {
        contentEl.classList.remove('empty');
        contentEl.innerHTML = e.state.content;
      }

      // Update active nav item
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      const currentUrl = window.location.href;
      navLinks.forEach(function (link) {
        const parent = link.parentElement;
        if (link.getAttribute('href') === currentUrl) {
          parent.classList.add('active');
        } else {
          parent.classList.remove('active');
        }
      });
    }
  });

  function markNavItem(item) {
    document.querySelectorAll('.navbar-nav .nav-item').forEach(function (el) {
      el.classList.remove('active');
    });
    item.parentElement.classList.add('active');
  }

  function audioIconToggle() {
    if (audioBtn) {
      audioBtn.classList.toggle('on');
    }
  }

  let currentRequestId = 0;

  function switchLetter(url) {
    // Don't reload current letter
    if (url === window.location.href) {
      return;
    }

    // Track latest request so stale responses are ignored
    const requestId = ++currentRequestId;

    // Send a Get request to the URL
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status + ' for ' + url);
        }
        return response.text();
      })
      .then(function (data) {
        if (requestId !== currentRequestId) {
          return;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Get the title of the new page
        const newTitle = doc.querySelector('title').textContent;

        // Set the title to the new title
        document.title = newTitle;

        // Replace the content
        const newContent = doc.querySelector('#content').innerHTML;
        const contentEl = document.getElementById('content');
        if (contentEl) {
          contentEl.classList.remove('empty');
          contentEl.innerHTML = newContent;
        }

        // Mark current letter in main navigation
        const navLink = document.querySelector('.navbar-nav a[href="' + url + '"]');
        if (navLink) {
          markNavItem(navLink);
        }

        // Push a new state to the browser
        history.pushState({
          'title': document.title,
          'content': newContent
        }, newTitle, url);

        // Collapse navbar on mobile
        if (navbarContent) {
          navbarContent.classList.remove('show');
        }
      })
      .catch(function (err) {
        if (requestId === currentRequestId) {
          error('Error loading letter:', err);
        }
      });
  }

})();
