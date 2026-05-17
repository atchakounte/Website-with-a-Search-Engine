// Source - https://stackoverflow.com/q/41618292
// Posted by spidey677
// Retrieved 2026-05-17, License - CC BY-SA 3.0

document.addEventListener("DOMContentLoaded", function () {
  q = "+=";

  request = new XMLHttpRequest();
  request.open(
    "GET",
    "http://api.giphy.com/v1/gifs/random?api_key=MEbhYMd1M1q4ciR9c1IqoyU9yVKda7Ph" +
      q,
    true,
  );

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.responseText).data.image_url;
      console.log(data);
      document.getElementById("here_is_gif").innerHTML =
        '<center><img src = "' + data + '"  title="GIF via Giphy"></center>';
    } else {
      console.log("reached giphy, but API returned an error");
    }
  };

  request.onerror = function () {
    console.log("connection error");
  };

  request.send();
});
