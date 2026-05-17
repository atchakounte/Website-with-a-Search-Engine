let giphyContainer = document.querySelector(".js-giphy-container");
let form = document.querySelector(".js-giphy-form");
let giphySearchQuery = document.querySelector("[name=giphy-query-name]");
let globalSearchQuery = "";

function renderImagesHtml2(query) {
  const giphyApiBetaKey = "MEbhYMd1M1q4ciR9c1IqoyU9yVKda7Ph";
  const limit = 5;
  const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${giphyApiBetaKey}&limit=${limit}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      // erroneous response is not an array, but an object
      //if (!Array.isArray(response)) {
      //  throw "Erroneous response";
      //}
      let processedRespone =
        '<div class="image-item">' +
        response
          .map(
            (data) => `
        <img src="${data.data.images.original.url}"
            alt="${data.data.title}"/>
         <p>Title: ${data.data.title}</p>
      `,
          )
          .join("") +
        "</div>";
      giphyContainer.innerHTML = processedRespone;
    })
    .catch((err) => {
      console.warn(err);
      giphyContainer.innerHTML = `<p>Error fetching repo: ${query}</p>`;
    });
}

function renderImagesHtml(data) {
  let html = '<div class="image-container">';
}

async function fetchGiphyImageSrc(query) {
  const giphyApiBetaKey = "MEbhYMd1M1q4ciR9c1IqoyU9yVKda7Ph";
  const limit = 5;
  const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${giphyApiBetaKey}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    renderImagesHtml(result);
  } catch (error) {
    console.error("Error fetching Giphy:", error);
  }
}

function formSubmitted(event) {
  // TODO input validation?
  event.preventDefault();
  let query = giphySearchQuery.value;
  globalSearchQuery = query;
  fetchGiphyImageSrc(query);
}

form.addEventListener("submit", formSubmitted);
