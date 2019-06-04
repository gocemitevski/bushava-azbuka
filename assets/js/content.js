// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
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

  if (isUnmuted == undefined) {
    localStorage.setItem('isUnmuted', 0);
  } /*else{
    // This will not work in browsers that block autoplay!
    if (isUnmuted == '1'){
      video.muted = !Boolean(isUnmuted);
      audioIconToggle();
    }
  }*/

  $(".navbar-nav .nav-link").on('click', function (e) {

    // Stop link from activating
    e.preventDefault();

    markNavItem($(this));

    // Get the URL to load
    url = $(this).attr('href');

    // Send a Get request to the URL
    $.get(url, function (data) {

      // Get the title of the new page
      var newTitle = $(data).filter('title').html();

      // Set the title to the new title
      $('title').html(newTitle);

      // Replace the content
      $('#content').html($(data).find('#content').html());

      // Push a new state to the browser
      history.pushState({
        'title': $('title').html(),
        'content': $('#content').removeClass('empty').html()
      }, newTitle, url);

      modalCreate();
      modalDestroy();

    });

    $('#navbarSupportedContent').collapse('hide');

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

    if ($(el).attr('href') == e.originalEvent.currentTarget.location.pathname) {
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

    videoPlaceholder.parent().append('<iframe id="videoIframe" width="560" height="315" src="' + videoPlaceholder.attr('data-src') + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

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
