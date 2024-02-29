const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const apiKey = "9c6f32a";
const defaultMovies = ["Batman", "The Avengers", "Spiderman"];

function returnMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.Search);
      main.innerHTML = "";

      if (data.Search) {
        data.Search.forEach((element) => {
          const div_card = document.createElement("div");
          div_card.setAttribute("class", "card");

          const div_row = document.createElement("div");
          div_row.setAttribute("class", "row");

          const div_column = document.createElement("div");
          div_column.setAttribute("class", "column");

          const image = document.createElement("img");
          image.setAttribute("class", "thumbnail");
          image.setAttribute("id", "image");

          const title = document.createElement("h3");
          title.setAttribute("id", "title");

          const center = document.createElement("center");
          title.innerHTML = `${element.Title}<br><a href="Movie.html?id=${element.imdbID}&title=${element.Title}">reviews</a>`;
          image.src = element.Poster;

          center.appendChild(image);
          div_card.appendChild(center);
          div_card.appendChild(title);
          div_column.appendChild(div_card);
          div_row.appendChild(div_column);
          main.appendChild(div_row);
        });
      } else {
        console.log("No movies found");
      }
    });
}

function displayDefaultMovies() {
  defaultMovies.forEach((movie) => {
    const url = `http://www.omdbapi.com/?s=${encodeURIComponent(
      movie
    )}&apikey=${apiKey}`;
    returnMovies(url);
  });
}

displayDefaultMovies();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchItem = search.value;
  if (searchItem) {
    const url = `http://www.omdbapi.com/?s=${encodeURIComponent(
      searchItem
    )}&apikey=${apiKey}`;
    returnMovies(url);
    search.value = "";
  }
});
