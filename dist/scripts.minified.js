let pokemonRepository = (function () {
  let e = [],
    t = document.querySelector("#modal-container");
  function n(t) {
    e.push(t);
  }
  function i() {
    return e;
  }
  function o(e) {
    return fetch(e.detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types.map((e) => e.type.name).join("  and  "));
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function a(e) {
    o(e).then(function () {
      l(e);
    });
  }
  function l(e) {
    let n = document.querySelector(".modal-body");
    n.innerHTML = "";
    let i = document.querySelector(".modal-header");
    i.innerHTML = "";
    let o = document.createElement("h1");
    o.innerText = e.name;
    let a = document.createElement("p");
    a.innerText = "Height: " + e.height + "in tall";
    let l = document.createElement("p");
    l.innerText = "These are their types: " + e.types;
    let s = document.createElement("img");
    s.classList.add("my-image"),
      (s.src = e.imageUrl),
      i.appendChild(o),
      n.appendChild(a),
      n.appendChild(l),
      n.appendChild(s),
      t.classList.add("is-visible"),
      t.addEventListener("click", (e) => {
        e.target === t && r();
      });
  }
  function r() {
    t.classList.remove("is-visible");
  }
  return (
    window.addEventListener("keydown", (e) => {
      "Escape" === e.key && t.classList.contains("is-visible") && r();
    }),
    {
      add: n,
      getAll: i,
      addListItem: function e(t) {
        let n = document.querySelector(".pokemon-list"),
          i = document.createElement("li"),
          o = document.createElement("button");
        o.setAttribute("data-toggle", "modal"),
          o.setAttribute("data-target", "#exampleModalCenter"),
          i.classList.add("list-item-pokemon"),
          (o.innerText = t.name),
          o.classList.add("btn", "btn-outline-secondary", "pokemon-button"),
          i.appendChild(o),
          n.appendChild(i),
          o.addEventListener("click", function (e) {
            a(t);
          });
      },
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              let t = { name: e.name, detailsUrl: e.url };
              n(t), console.log(t);
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: o,
      showDetails: a,
      showModal: l,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
