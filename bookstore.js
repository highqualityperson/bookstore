function createNode(element) {
  return document.createElement(element);
}

var data = "https://api.myjson.com/bins/zyv02";
var lang = "en";

function change_language(obj) {
  if (obj.className === "lang_en") {
    console.log("get books in English.");
    data = "https://api.myjson.com/bins/zyv02";
    lang = "en";
    fetch_data(data);
  } else {
    console.log("get books in Spanish.");
    data = "https://api.myjson.com/bins/1h3vb3";
    lang = "es";
    fetch_data(data);
  }
}

function fetch_data(data) {
  fetch(data)
    .then(onDataFetched)
    .catch(onDataFetchFailed);
}

window.onload = fetch_data(data);

function onDataFetched(response) {
  response
    .json()
    .then(onConversionToJsonSuccessful)
    .catch(onConversionToJsonFailed);
}

function onDataFetchFailed(error) {
  console.log("no books.", error);
}

function onConversionToJsonSuccessful(json) {
  console.log("got books.", json);
  data = json;
  books = data.books;
  changeText(books);
}

function onConversionToJsonFailed(error) {
  console.log("wrong file, dude!", error);
}

function changeText(books) {
  for (var i = 0; i < books.length; i++) {
    var fliperContainer = document.createElement("div");

    fliperContainer.classList.add("flip-container");
    fliperContainer.setAttribute(
      "ontouchstart",
      'this.classList.toggle("hover");'
    );
    fliperContainer.setAttribute("data-title", books[i].title);

    var flipper = document.createElement("div");
    flipper.classList.add("flipper");
    var front = document.createElement("div");
    front.classList.add("front");
    var back = document.createElement("ul");
    back.classList.add("back");

    var img = new Image();
    img.classList.add("images");
    img.src = books[i].cover || books[i].portada;

    var title = document.createElement("p");
    title.innerHTML = books[i].title || books[i].titulo;

    var description = document.createElement("p");
    description.innerHTML = books[i].description || books[i].descripcion;
    var button = document.createElement("button");
    var info = document.createTextNode("More Info");

    button.setAttribute("href", books[i].detail || books[i].detalle);
    button.setAttribute("data-fancybox", "gallery");

    button.appendChild(info);

    front.appendChild(img);
    back.append(title);
    back.append(description);
    back.append(button);

    flipper.appendChild(front);
    flipper.appendChild(back);
    fliperContainer.appendChild(flipper);
    document.getElementById("allbooks").appendChild(fliperContainer);
  }
}

var searchBar = document.forms["filterbox"].querySelector("#myInput");
searchBar.addEventListener("keyup", function(e) {
  var term = e.target.value.toLowerCase();
  books.forEach(function(book) {
    var bookInHTML = document.querySelector(
      '[data-title="' + book.title + '"]'
    );
    console.log(bookInHTML);
    if (book.title.toLowerCase().indexOf(term) != -1) {
      bookInHTML.style.display = "block";
    } else {
      bookInHTML.style.display = "none";
    }
  });
});
