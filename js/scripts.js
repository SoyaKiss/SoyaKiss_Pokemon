let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonUnorderedList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModalCenter");
    listItem.classList.add("list-item-pokemon");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-outline-secondary", "pokemon-button");
    listItem.appendChild(button);
    pokemonUnorderedList.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types
          .map((type) => type.type.name)
          .join("  and  ");
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(item) {
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";
    let modalHeader = document.querySelector(".modal-header");
    modalHeader.innerHTML = "";

    let titleElement = document.createElement("h1");
    titleElement.innerText = item.name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "Height: " + item.height + "in tall";

    let typesElement = document.createElement("p");
    typesElement.innerText = "These are their types: " + item.types;

    let myImage = document.createElement("img");
    myImage.classList.add("my-image");
    myImage.src = item.imageUrl;

    modalHeader.appendChild(titleElement);
    modalBody.appendChild(contentElement);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(myImage);

    modalContainer.classList.add("is-visible");
    modalContainer.addEventListener("click", (e) => {
      let target = e.target;

      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
