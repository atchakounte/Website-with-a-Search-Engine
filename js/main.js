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
  let html = '<div class="image-item">';

  try {
    if (!(data.data.length > 0)) {
      throw "Erroneous response";
    }

    for (let i = 0; i < data.data.length; i++) {
      let imagesOriginalUrl = data.data[i].images.original.url;
      let imagesTitle = data.data[i].title;
      html += `
        <img 
            src="${imagesOriginalUrl}"
            alt="${imagesTitle}"/>
        <p>Title: ${imagesTitle}</p>`;
    }
    html += "</div>";
    let cleanedHtml = html.replace(/>\s+</g, "><");
    giphyContainer.innerHTML = html;

    console.log(cleanedHtml);
  } catch (error) {
    console.warn(error);
    giphyContainer.innerHTML = `<p>Error searching for: ${globalSearchQuery}</p>`;
  }
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
