// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js')
      .then(function (reg) {
        console.log('Service worker registered.', reg);
      }).catch(function (err) {
        console.log('Service worker registration failed: ', err);
      })
  });
}

/* Not ready yet!

var deferredPrompt;
var btnAdd = document.querySelector('.btn-install');

window.addEventListener('beforeinstallprompt', function (e) {

  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();

  console.log(e);

  // Stash the event so it can be triggered later
  deferredPrompt = e;

  btnAdd.style.display = 'block';

});

btnAdd.addEventListener('click', function (e) {

  deferredPrompt.prompt();

  deferredPrompt.userChoice.then(function (choiceResult) {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    }
    deferredPrompt = null;
  });

});
*/

$(document).ready(function (e) {

  var audio = document.getElementById("audio");
  var video = document.getElementById("video");
  var isUnmuted = localStorage.getItem('isUnmuted');
  var buttonShare = $('.btn-share');

  if (isUnmuted == undefined) {
    localStorage.setItem('isUnmuted', 0);
  } /*else{
    // This will not work in browsers that block autoplay!
    if (isUnmuted == '1'){
      video.muted = !Boolean(isUnmuted);
      audioIconToggle();
    }
  }*/

  if (navigator.share) {
    buttonShare.removeClass('d-none');
  }

  buttonShare.on('click', function () {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: $("meta[name='description']").attr('content'),
        url: document.location,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Извинете, вашиот прелистувач не ја поддржува оваа можност.')
    }
  });

  $(document).on('click', '.btn-nav', function (e) {

    // Stop link from activating
    e.preventDefault();

    var url = $(e.target).attr('href');

    switchLetter(url);

    return false;

  });

  $(".navbar-nav .nav-link").on('click', function (e) {

    // Stop link from activating
    e.preventDefault();

    markNavItem($(this));

    // Get the URL to load
    url = $(this).attr('href');

    switchLetter(url);

  });

  $(audio).on("click", function (e) {

    if (video.muted) {
      video.muted = false;
      localStorage.setItem('isUnmuted', 1);
    } else {
      video.muted = true;
      localStorage.setItem('isUnmuted', 0);
    }

    audioIconToggle();

  });

  modalCreate();
  modalDestroy();

});

$(window).on("popstate", function (e) {

  // When the browser goes back replace the content and title
  $('title').html(e.originalEvent.state.title);
  $('#content').removeClass('empty').html(e.originalEvent.state.content);

  $.each($('.navbar-nav .nav-link'), function (key, el) {

    if ($(el).attr('href') == e.originalEvent.currentTarget.location.href) {
      $(el).parent().addClass('active');
    } else {
      $(el).parent().removeClass('active');
    }

  });

});

function markNavItem(item) {

  $('.navbar-nav .nav-item').removeClass('active');
  item.parent().addClass('active');

}

function modalCreate() {

  // Make sure iframe is reinitialized when modal is closed.
  $('#videoEpizoda').on('show.bs.modal', function () {

    var video = document.getElementById("video");

    video.muted = true;
    audio.classList.remove("on");

    var videoPlaceholder = $('#videoPlaceholder');

    const videoIframe = document.createElement("iframe");
    videoIframe.id = "videoIframe";
    videoIframe.width = 560;
    videoIframe.height = 315;
    videoIframe.src = encodeURI(videoPlaceholder.attr('data-src'));
    videoIframe.frameBorder = "0";
    videoIframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    videoIframe.allowFullscreen = true;

    videoPlaceholder.parent().append(videoIframe);

  });

}

function modalDestroy() {

  // Make sure iframe is reinitialized when modal is closed.
  $('#videoEpizoda').on('hide.bs.modal', function () {

    var iframe = $('#videoIframe');
    var isUnmuted = localStorage.getItem('isUnmuted');

    if (isUnmuted === '1') {
      video.muted = false;
      localStorage.setItem('isUnmuted', 1);
      audioIconToggle();
    }

    iframe.remove();

  });

}

function audioIconToggle() {

  var audio = document.getElementById("audio");

  audio.classList.toggle("on");

}

function switchLetter(url) {

  // Send a Get request to the URL
  $.get(url, function (data) {

    // Don't reload current letter
    if (url == document.location) {
      return;
    }

    // Get the title of the new page
    var newTitle = $(data).filter('title').html();
    // Set the title to the new title
    $('title').html(newTitle);

    // Replace the content
    $('#content').html($(data).find('#content').html());

    // Mark current letter in main navigation
    markNavItem($('.navbar-nav .nav-link[href="' + url + '"]'));

    // Push a new state to the browser
    history.pushState({
      'title': $('title').html(),
      'content': $('#content').removeClass('empty').html()
    }, newTitle, url);

    modalCreate();
    modalDestroy();

    $('#navbarSupportedContent').collapse('hide');

  });

}
