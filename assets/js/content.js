$(document).ready(function (e) {

  modalSoundControl();
  modalCreate();
  modalDestroy();
  bindLinks();

});

$(window).on("popstate", function (e) {

  // When the browser goes back replace the content and title
  $('title').html(e.originalEvent.state.title);
  $('#content').removeClass('empty').html(e.originalEvent.state.content);

})

function bindLinks() {

  $(".navbar-nav a.nav-link[href^='/']").on('click', function (e) {

    // Stop link from activating
    e.preventDefault();

    $('.navbar-nav .nav-item').removeClass('active');

    $(this).parent().addClass('active');

    // Get the URL to load
    url = $(this).attr('href');

    // Send a Get request to the URL
    $.get(url, function (data) {
      // Get the title of the new page
      // var regex = RegExp('/<title>(.*)<\/title>/', 'g');
      var newTitle = '';

      // Set the title to the new title
      $('title').html(newTitle);

      // Replace the content
      $('#content').html($(data).find('#content').html());

      // Push a new state to the browser
      history.pushState({
        'title': $('title').html(),
        'content': $('#content').removeClass('empty').html()
      }, newTitle, url);

      modalSoundControl();
      modalDestroy();
      modalCreate();

    });

  });

}

function modalSoundControl() {

  $('#videoEpizoda').on('shown.bs.modal', function () {

    var video = document.getElementById("video");

    if (video.muted === false) {
      video.muted = true;
      audioIconToggle();
      localStorage.setItem('hasUnmuted', false);
    } else {
      localStorage.setItem('hasUnmuted', true);
    }

  });

}

function modalCreate() {

  // Make sure iframe is reinitialized when modal is closed.
  $('#videoEpizoda').on('show.bs.modal', function () {

    var videoPlaceholder = $('#videoPlaceholder');

    videoPlaceholder.parent().append('<iframe id="videoIframe" width="560" height="315" src="' + videoPlaceholder.attr('data-src') + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

  });

}

function modalDestroy() {

  // Make sure iframe is reinitialized when modal is closed.
  $('#videoEpizoda').on('hidden.bs.modal', function () {

    var video = document.getElementById("video");
    var hasUnmuted = Boolean(localStorage.getItem('hasUnmuted'));
    var iframe = $('#videoIframe');

    if (hasUnmuted === true) {
      video.muted = false;
      audioIconToggle();
    } else {
      localStorage.setItem('hasUnmuted', false);
    }

    $('#videoIframe').remove();

  });

}

function audioIconToggle() {

  var audio = document.getElementById("audio");

  audio.classList.toggle("on");

}
