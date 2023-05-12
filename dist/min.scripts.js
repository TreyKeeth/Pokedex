let pokemonRepository = (function () {
  let t = [];
  function e(e) {
    "object" == typeof e && "name" in e
      ? t.push(e)
      : document.write("This is not a pokemon. Please enter a valid name.<br>");
  }
  function n() {
    return t;
  }
  function o(t) {
    return fetch(t.detailsUrl)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types),
          a(t);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function i(t) {
    o(t).then(function () {
      a(t);
    });
  }
  function a(t) {
    let e = $(".modal-body"),
      n = $(".modal-title");
    n.empty(), e.empty();
    let o = $("<h5>" + t.name + "</h5>"),
      i = $("<p>Height : " + t.height + "</p>"),
      a = "";
    t.types.forEach(function (t) {
      a += [t.type.name + "<br>"];
    });
    let l = $("<p>Types : " + a + "</p>"),
      r = $('<img class="modal-imgstyle"="width:50%">');
    r.attr("src", t.imageUrl),
      n.append(o),
      e.append(i),
      e.append(l),
      e.append(r);
  }
  return {
    add: e,
    getAll: n,
    addListItem: function t(e) {
      let n = document.querySelector(".pokemon-list"),
        o = document.createElement("li");
      o.classList.add("list-group-item");
      let a = document.createElement("button");
      a.classList.add("btn"),
        a.classList.add("btn-primary"),
        a.setAttribute("data-toggle", "modal"),
        a.setAttribute("data-target", "#exampleModal"),
        a.addEventListener("click", function (t) {
          i(e);
        }),
        (a.innerText = e.name),
        o.appendChild(a),
        n.appendChild(o);
    },
    loadList: function t() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            e({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: o,
    showDetails: i,
    showModal: a,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
