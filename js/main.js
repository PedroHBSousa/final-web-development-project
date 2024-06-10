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

const allMovies = [
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    date: "14/10/1994",
    description: "Two imprisoned",
    idMovie: "278",
    addressImage:
      "https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
  },
  {
    title: "The Godfather",
    genre: "Crime",
    date: "24/03/1972",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    idMovie: "238",
    addressImage:
      "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
  },
];

function convertToBrazilianDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
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

      addressImage.value =
        "https://image.tmdb.org/t/p/original" + detailsMovie.poster_path;
    } catch (error) {
      console.log(error);
      if (
        error instanceof TypeError &&
        error.message.includes(
          "Cannot read properties of undefined (reading 'id')"
        )
      ) {
        alert(
          "Erro: O filme digitado não foi encontrado. Por favor, tente novamente ou digite outro filme."
        );
      }
    } finally {
      loader.classList.remove("active");
      main.classList.remove("hidden");
    }
  }
});

function addCard({ title, genre, date, description, idMovie, addressImage }) {
  const main = document.querySelector("body > main");

  main.innerHTML += `
  <div class="card-ticker" id="${idMovie}" onmouseenter="cardEnter(event)" onmouseleave="cardLeave(event)" >
    <div>
      <header>${title}</header>
      <div id="poster-preview-${idMovie}" class="poster-preview">
		  </div>
      <p>${genre}</p>
      <p>${date}</p> 
      <p>${description}</p>
	    </div>
      <div class="card-menu">
				<span>Editar</span>
				<span onclick="removeCard(event)">Excluir</span>
			</div>
  </div>
  `;
  const posterPreview = document.querySelector(`#poster-preview-${idMovie}`);
  posterPreview.style.backgroundImage = `url(${addressImage})`;

  const allEdit = main.querySelectorAll(
    ".card-ticker .card-menu span:first-child"
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
  event.target.closest(".card-ticker").remove();
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
  const card = event.target.closest(".card-ticker");

  const title = document.getElementById("edit-title");
  title.value = card.querySelector("header").innerText;

  const genre = document.getElementById("edit-genre");
  genre.value = card.querySelector("p:first-of-type").innerText;

  const date = document.getElementById("edit-date");
  date.value = card.querySelector("p:nth-of-type(2)").innerText;

  const description = document.getElementById("edit-description");
  description.value = card.querySelector("p:nth-of-type(3)").innerText;

  console.log(addressImage.value);
  openModal("edit-form-modal");
};
