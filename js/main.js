const allAddresses = [
  {
    cep: "11601033",
    uf: "SP",
    cidade: "São Sebastião",
    bairro: "Canto Do Mar",
    rua: "Rua Antonio Inacio da Costa",
    number: 199,
  },
  {
    cep: "11601033",
    uf: "SP",
    cidade: "São Sebastião",
    bairro: "Canto Do Mar",
    rua: "Rua Antonio Inacio da Costa",
    number: 199,
  },
  {
    cep: "11601033",
    uf: "SP",
    cidade: "São Sebastião",
    bairro: "Canto Do Mar",
    rua: "Rua Antonio Inacio da Costa",
    number: 199,
  },
];

const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");

const openModal = (idModal) => {
  const modal = document.getElementById(idModal);
  modal.style.display = "flex";
};

// ------------------- API VIACEP -------------------
cep.addEventListener("focusout", async () => {
  try {
    const onlyNumbers = /^[0-9]+$/;
    const cepValid = /^[0-9]{8}$/;

    if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)) {
      throw { cep_error: "CEP invalid" };
    }
    const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

    if (!response.ok) {
      throw { cep_error: "CEP not found" };
    }
    const responseCep = await response.json();
    rua.value = responseCep.logradouro;
    bairro.value = responseCep.bairro;
    cidade.value = responseCep.localidade;
    uf.value = responseCep.uf;
  } catch (error) {
    console.log(error);
  }
  // let search = cep.value.replace("-", "");
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
