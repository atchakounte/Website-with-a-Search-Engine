###

function renderImagesHtml2(query) {
const giphyApiBetaKey = "MEbhYMd1M1q4ciR9c1IqoyU9yVKda7Ph";
const limit = 5;
const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${giphyApiBetaKey}&limit=${limit}`;

fetch(url)
.then((response) => response.json())
.then((response) => {
// erroneous response is not an array, but an object
//if (!Array.isArray(response)) {
// throw "Erroneous response";
//}
let processedRespone =
'<div class="image-item">' +
response
.map(
(data) => `             <img src="${data.data.images.original.url}"
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
