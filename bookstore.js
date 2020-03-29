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
  keys_array = Object.keys(books[0]);
  changeText(books, keys_array);
}

function onConversionToJsonFailed(error) {
  console.log("wrong file, dude!", error);
}

function changeText(books, keys_array) {
  for (var i = 0; i < books.length; i++) {
    //  flipContainer
    var flipContainer = document.createElement("div");
    flipContainer.classList.add("flip-container");
    flipContainer.setAttribute(
      "ontouchstart",
      'this.classList.toggle("hover");'
    );
    // title
    flipContainer.setAttribute("data-title", books[i][keys_array[2]]);

    var flip = document.createElement("div");
    flip.classList.add("flip");
    var front = document.createElement("div");
    front.classList.add("front");
    var back = document.createElement("ul");
    back.classList.add("back");

    var img = new Image();
    img.classList.add("images");

    // cover
    img.src = books[i][keys_array[0]];

    // title
    var title = document.createElement("p");
    title.innerHTML = books[i][keys_array[2]];

    // description
    var description = document.createElement("p");
    description.innerHTML = books[i][keys_array[3]];
    var button = document.createElement("button");
    var info = document.createTextNode("More Info");

    //  detail
    button.setAttribute("href", books[i][keys_array[1]]);
    button.setAttribute("data-fancybox", "gallery");

    button.appendChild(info);

    front.appendChild(img);
    back.append(title);
    back.append(description);
    back.append(button);

    flip.appendChild(front);
    flip.appendChild(back);
    flipContainer.appendChild(flip);
    document.getElementById("allbooks").appendChild(flipContainer);
  }
}

var searchBar = document.forms["filterbox"].querySelector("#myInput");
searchBar.addEventListener("keyup", function(e) {
  var term = e.target.value.toLowerCase();
  books.forEach(function(book) {
    var bookInHTML = document.querySelector(
      '[data-title="' + book[keys_array[2]] + '"]'
    );
    console.log(bookInHTML);
    if (book.title.toLowerCase().indexOf(term) != -1) {
      bookInHTML.style.display = "block";
    } else {
      bookInHTML.style.display = "none";
    }
  });
});
