document.addEventListener("DOMContentLoaded", function (e) {

  var audio = document.getElementById("audio");
  var video = document.getElementById("video");
  localStorage.setItem('hasUnmuted', false);

  audio.addEventListener("click", function (e) {

    audio.classList.toggle("on");

    if (video.muted) {
      video.muted = false;
      localStorage.setItem('hasUnmuted', true);
    } else {
      video.muted = true;
      // localStorage.setItem('hasUnmuted', false);
    }


  });

});
