
const nameMovie = document.getElementById("nameMovie");
const genre = document.getElementById("genre");
const releaseDate = document.getElementById("date");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const number = document.getElementById("number");

function convertToBrazilianDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}


const openModal = (idModal) => {
  const modal = document.getElementById(idModal);
  modal.style.display = "flex";
};
// ------------------- API VIACEP -------------------
nameMovie.addEventListener("focusout", async () => {
try {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmM3ZWNiMGYzOWZhMDc3Y2E1YWIzZjNhZTU2NmFjMCIsInN1YiI6IjY2NWZhZmIxMzU1MjFlZjc4MmI0YTI2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v68XA_FTrnGRuhqWgdaqieJgz8wI8WqywfEauczlFIs'
    }
  };
  
  const responseID = await fetch(`https://api.themoviedb.org/3/search/movie?query=${nameMovie.value}&include_adult=false`, options);
  const data = await responseID.json();

  const responseDetails= await fetch(`https://api.themoviedb.org/3/movie/${data.results[0].id}?language=en-US'`, options);
  const detailsMovie = await responseDetails.json();

  genre.value = detailsMovie.genres[1].name;
  releaseDate.value = convertToBrazilianDate(detailsMovie.release_date);

console.log(detailsMovie);

} catch (error) {
  console.log(error)
}
});


function addCard({ cep, uf, cidade, bairro, rua, number }) {
  const main = document.querySelector("body > main");

  main.innerHTML += `
  <div class="card-ticker" >
   <header>${cep}</header>
    <p>${uf}</p>
    <p>${cidade}</p> 
    <p>${bairro}</p>
    <p>${rua}</p>
    <p>${number}</p>
  
	</div>
  `;
}

function loadCards() {
  allAddresses.map((address) => addCard(address));
}

const createCard = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const address = Object.fromEntries(formData);

  addCard(address);
  event.target.reset();
  closeModal(null, "add-form-modal");
};

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

