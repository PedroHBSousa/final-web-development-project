const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-movie");
const title = document.getElementById("title");
const genre = document.getElementById("genre");
const releaseDate = document.getElementById("date");
const description = document.getElementById("description");
const poster = document.querySelector(".poster-preview");
const main = document.querySelector("#main-content");
const addressImage = document.getElementById("addressImage");
const idMovie = document.getElementById("idMovie");
const runTime = document.getElementById("runtime");
const loader = document.getElementById("loader");

const allMovies = [
  {
    title: "The Batman",
    genre: "Crime",
    date: "2022",
    description:
      "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    idMovie: "414906",
    runtime: "2h 57m",
    addressImage:
      "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    title: "Avatar: The Way of Water",
    genre: "Science Fiction",
    date: "2022",
    description:
      "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    idMovie: "76600",
    runtime: "3h 12m",
    addressImage:
      "https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
  },
  {
    title: "1917",
    genre: "War",
    date: "2019",
    description:
      "At the height of the First World War, two young British soldiers must cross enemy territory and deliver a message that will stop a deadly attack on hundreds of soldiers.",
    idMovie: "530915",
    runtime: "1h 59m",
    addressImage:
      "https://image.tmdb.org/t/p/original/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
  },
  {
    title: "Oppenheimer",
    genre: "Drama",
    date: "2023",
    description:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    idMovie: "872585",
    runtime: "3h 1m",
    addressImage:
      "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
  {
    title: "Pearl",
    genre: "Horror",
    date: "2022",
    description:
      "Trapped on her family’s isolated farm, Pearl must tend to her ailing father under the bitter and overbearing watch of her devout mother. Lusting for a glamorous life like she’s seen in the movies, Pearl’s ambitions, temptations, and repres...",
    idMovie: "949423",
    runtime: "1h 42m",
    addressImage:
      "https://image.tmdb.org/t/p/original/ulBLIBqvdnf4H6JBt0OpMCU1ECn.jpg",
  },
  {
    title: "Once Upon a Time... in Hollywood",
    genre: "Comedy",
    date: "2019",
    description:
      "Los Angeles, 1969. TV star Rick Dalton, a struggling actor specializing in westerns, and stuntman Cliff Booth, his best friend, try to survive in a constantly changing movie industry. Dalton is the neighbor of the young and promising actress and model Sharon Tate, who has just married the prestigious Polish director Roman Polanski…",
    idMovie: "466272",
    runtime: "2h 42m",
    addressImage:
      "https://image.tmdb.org/t/p/original/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
  },
  {
    title: "Furiosa: A Mad Max Saga",
    genre: "Action",
    date: "2024",
    description:
      "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
    idMovie: "786892",
    runtime: "2h 29m",
    addressImage:
      "https://image.tmdb.org/t/p/original/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
  },
];

function convertToBrazilianDate(date) {
  const [year] = date.split("-");
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

function showAlert(message) {
  const alertBox = document.getElementById("custom-alert");
  alertBox.textContent = message;
  alertBox.classList.add("show");
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
}

searchButton.addEventListener("click", async (event) => {
  main.classList.add("hidden");
  loader.style.display = "block";
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
      `https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&include_adult=false`,
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

      const newMovie = {
        title: detailsMovie.title,
        genre: detailsMovie.genres[0].name,
        date: convertToBrazilianDate(detailsMovie.release_date),
        description: detailsMovie.overview,
        idMovie: detailsMovie.id,
        runtime: converterMinutosParaHoras(detailsMovie.runtime),
        addressImage: `https://image.tmdb.org/t/p/original${detailsMovie.poster_path}`,
      };
      allMovies.push(newMovie);
      openModal("add-form-modal");
    } else {
      showAlert("The inserted movie was not found");
    }
  } catch (error) {
    console.log(error);
    alert("A problem occurred on the server");
  } finally {
    loader.style.display = "none";
    main.classList.remove("hidden");
  }
});

function addCard({
  title,
  genre,
  date,
  description,
  runtime,
  idMovie,
  addressImage,
}) {
  const main = document.querySelector("body > main");

  main.insertAdjacentHTML(
    "afterbegin",
    `
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
  `
  );

  const allEdit = main.querySelectorAll(
    ".movie_card .card-menu span:first-child"
  );
  allEdit.forEach((edit) => {
    edit.addEventListener("click", openEditModal);
  });
}

function openEditSchedule(day) {
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("day-title").innerText =
    day.charAt(0).toUpperCase() + day.slice(1);
  currentDay = day;

  const radioInputDiv = document.getElementById("radio-input");
  radioInputDiv.innerHTML = ""; // Limpa as opções anteriores

  allMovies.forEach((movie, index) => {
    const label = document.createElement("label");
    label.classList.add("label");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "movie-radio";
    input.value = index;
    input.id = `movie-${index}`;
    input.onclick = () => (selectedMovie = movie);

    const text = document.createElement("p");
    text.classList.add("text");
    text.innerText = movie.title;

    label.appendChild(input);
    label.appendChild(text);
    radioInputDiv.appendChild(label);
  });
}
function closeEditSchedule() {
  document.getElementById("overlay").style.display = "none";
}
function confirmSelection() {
  if (selectedMovie) {
    const card = document.getElementById(currentDay).querySelector(".card");
    card.querySelector("img").src = selectedMovie.addressImage;
    card.querySelector(".card__title").innerText = selectedMovie.title;
    card.querySelector(".card__description").innerText =
      selectedMovie.description;
    closeEditSchedule();
  }
}
function markAsWatched(day) {
  const card = document.getElementById(day).querySelector(".card");
  card.querySelector("img").src = "../img/popcorn.png";
  card.querySelector(".card__title").innerText = "No movie for today";
  card.querySelector(
    ".card__description"
  ).innerText = `Looks like you've already seen ${day} movie. Select the change option to add a movie.`;
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
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container-movies");
  let scrollInterval;

  container.addEventListener("mousemove", (event) => {
    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;

    clearInterval(scrollInterval);

    if (mouseX < 500) {
      scrollInterval = setInterval(() => {
        container.scrollLeft -= 10;
      }, 8); // Aproximadamente 60fps
    } else if (mouseX > containerRect.width - 500) {
      scrollInterval = setInterval(() => {
        container.scrollLeft += 10;
      }, 8); // Aproximadamente 60fps
    }
  });

  container.addEventListener("mouseleave", () => {
    clearInterval(scrollInterval);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("schedule-section");
  let scrollInterval;

  container.addEventListener("mousemove", (event) => {
    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;

    clearInterval(scrollInterval);

    if (mouseX < 300) {
      scrollInterval = setInterval(() => {
        container.scrollLeft -= 10;
      }, 10); // Aproximadamente 60fps
    } else if (mouseX > containerRect.width - 300) {
      scrollInterval = setInterval(() => {
        container.scrollLeft += 10;
      }, 10); // Aproximadamente 60fps
    }
  });

  container.addEventListener("mouseleave", () => {
    clearInterval(scrollInterval);
  });
});
