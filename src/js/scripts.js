let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");
  // That is a link to the API

  // These are standards that are part of the I.I.F.E function
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonUnorderedList = document.querySelector(".pokemon-list");
    // This targets the UL class; pokemon-list
    let listItem = document.createElement("li");
    // we are creating a new variable here called list item and declaring it to be a list item (li)
    let button = document.createElement("button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModalCenter");
    // We are adding a button functionality to these list items
    listItem.classList.add("list-item-pokemon");
    // Here we are giving it a class
    button.innerText = pokemon.name;
    // This is where we call the pokemon.name --> which comes from the API
    button.classList.add("btn", "btn-outline-secondary", "pokemon-button");
    // We are declaring a class name for our button
    listItem.appendChild(button);
    // Here we are appending the button to the list item
    pokemonUnorderedList.appendChild(listItem);
    // Here we are appending the new button/list item to the unordered list
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
      // Here, upon clicking the button - we are executing the showDetails function which is listed below
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
        // Now we add the details to the item
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
    // We first needed to call the loadDetails function; before showing the Modal --> because the modal
    // is fetching data from the loadDetails function!
  }

  // Adding the modal here --> will need to be replaced into the showDetails method
  function showModal(item) {
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";
    // let modalTitle = document.querySelector('.modal-title');
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

    // modalContainer.appendChild(modal);
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

// document.querySelector('#show-modal').addEventListener('click', () => {
//   showModal();
// });
