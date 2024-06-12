const search = document.getElementById("search-movie");
const title = document.getElementById("title");
const genre = document.getElementById("genre");
const releaseDate = document.getElementById("date");
const description = document.getElementById("description");
const poster = document.querySelector(".poster-preview");
const main = document.querySelector("#main-content");
const loader = document.querySelector(".loader");
const addressImage = document.getElementById("addressImage");
const idMovie = document.getElementById("idMovie");
const runTime = document.getElementById("runtime");

const allMovies = [
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    date: "1994",
    description: "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.d",
    idMovie: "278",
    runtime: "2h 22m",
    addressImage:
      "https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
  },
  {
    title: "Forest Gump",
    genre: "Comedy",
    date: "1994",
    description:
      "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him",
    idMovie: "13",
    runtime: "2h 22m",
    addressImage:
      "https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  },
];

function convertToBrazilianDate(date) {
  const [year, month, day] = date.split("-");
  return `${year}`;
}

function converterMinutosParaHoras(minutes) {
  var minutos = parseInt(minutes);

  var horas = Math.floor(minutos / 60);
  var minutosRestantes = minutos % 60;

  var resultado = horas + "h " + minutosRestantes + "m";
  return resultado;
}

const openModal = (idModal) => {
  const modal = document.getElementById(idModal);
  modal.style.display = "flex";
};

search.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    loader.classList.add("active");
    main.classList.add("hidden");
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmM3ZWNiMGYzOWZhMDc3Y2E1YWIzZjNhZTU2NmFjMCIsInN1YiI6IjY2NWZhZmIxMzU1MjFlZjc4MmI0YTI2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v68XA_FTrnGRuhqWgdaqieJgz8wI8WqywfEauczlFIs",
        },
      };

      const responseID = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search.value}&include_adult=false`,
        options
      );
      const data = await responseID.json();

      if (data.results[0]) {
        const responseDetails = await fetch(
          `https://api.themoviedb.org/3/movie/${data.results[0].id}?language=en-US'`,
          options
        );

        const detailsMovie = await responseDetails.json();

        title.value = detailsMovie.title;
        genre.value = detailsMovie.genres[0].name;
        idMovie.value = detailsMovie.id;
        releaseDate.value = convertToBrazilianDate(detailsMovie.release_date);
        description.value = detailsMovie.overview;
        poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${detailsMovie.poster_path})`;
        runTime.value = converterMinutosParaHoras(detailsMovie.runtime);

        addressImage.value =
          "https://image.tmdb.org/t/p/original" + detailsMovie.poster_path;
        console.log(detailsMovie);
      } else {
        alert(
          "Erro: O filme digitado não foi encontrado. Por favor, tente novamente ou digite outro filme."
        );
      }
    } catch (error) {
      console.log(error);

      alert("Problema Interno");
    } finally {
      loader.classList.remove("active");
      main.classList.remove("hidden");
    }
  }
});

function addCard({ title, genre, date, description, runtime, idMovie, addressImage }) {
  const main = document.querySelector("body > main");

  main.innerHTML += `
  <div class="movie_card" id="${idMovie}" onmouseenter="cardEnter(event)" onmouseleave="cardLeave(event)">
    <div class="info_section">
      <div class="movie_header">
        <img class="locandina" src="${addressImage}"/>
        <h1>${title}</h1>
        <h4>${date}</h4>
        <span class="minutes">${runtime}</span>
        <p class="type">${genre}</p>
    </div>
    <div class="movie_desc">
      <p class="text">
        ${description}
      </p>
    </div>
  </div>
  <div class="blur_back" style="background-image: url('${addressImage}')"></div>
  <div class="card-menu">
    <span class="card-menu-button-edit">Edit</span>
    <span class="card-menu-button-remove" onclick="removeCard(event)">Remove</span>
  </div>
</div>
  `;

  const allEdit = main.querySelectorAll(
    ".movie_card .card-menu span:first-child"
  );
  allEdit.forEach((edit) => {
    edit.addEventListener("click", openEditModal);
  });
}

function loadCards() {
  allMovies.map((movie) => addCard(movie));
}
const cardEnter = (event) => {
  const cardMenu = event.target.querySelector(".card-menu");
  cardMenu.style.display = "flex";
};

const cardLeave = (event) => {
  const cardMenu = event.target.querySelector(".card-menu");
  cardMenu.style.display = "none";
};

const removeCard = (event) => {
  event.target.closest(".movie_card").remove();
};

const createCard = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const movie = Object.fromEntries(formData);

  addCard(movie);
  event.target.reset();
  closeModal(null, "add-form-modal");
};

document
  .getElementById("return-button")
  .addEventListener("click", function (event) {
    closeModal(event, "add-form-modal");
  });

const closeModal = (event, id) => {
  if (id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";
    return;
  }

  if (event?.target?.className === "modal") {
    const modal = document.getElementById(event.target.id);
    modal.style.display = "none";
    return;
  }
};
const openEditModal = (event) => {
  const card = event.target.closest(".movie_card");

  const title = document.getElementById("edit-title");
  title.value = card.querySelector(".movie_header h1").innerText;

  const genre = document.getElementById("edit-genre");
  genre.value = card.querySelector(".movie_header .type").innerText;

  const date = document.getElementById("edit-date");
  date.value = card.querySelector(".movie_header h4").innerText;

  const description = document.getElementById("edit-description");
  description.value = card.querySelector(".movie_desc .text").innerText;

  const idMovie = document.getElementById("edit-idMovie");
  idMovie.value = card.id;

  const addressImage = document.getElementById("edit-addressImage");
  addressImage.value = card.querySelector(".locandina").getAttribute("src");
  
  openModal("edit-form-modal");
};
function updateCard({
  title,
  genre,
  date,
  description,
  idMovie,
  addressImage,
}) {
  const card = document.getElementById(idMovie);

  card.innerHTML = `
      <div>
        <img src="${addressImage}" id="poster-preview-${idMovie}" class="poster-preview">
        <header>${title}</header>
        <p>${genre}</p>
        <p>${date}</p> 
        <p class="truncate-3">${description}</p>
	    </div>
      <div class="card-menu">
				<span>Editar</span>
				<span onclick="removeCard(event)">Excluir</span>
			</div>
    `;

  const edit = card.querySelector(".card-ticker .card-menu span:first-child");
  edit.addEventListener("click", openEditModal);
}

const editCard = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const movie = Object.fromEntries(formData);
  const card = document.getElementById(movie.idMovie); //erro pode estar aqui
  console.log(card, movie);

  updateCard(movie);

  closeModal(null, "edit-form-modal");
};
