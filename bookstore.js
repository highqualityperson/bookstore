function createNode(element) {
  return document.createElement(element);
}

var data = "data.json";
var lang = "en";
window.onload = fetch_data(data);

function change_language(obj) {
  if (obj.className === "lang_en") {
    console.log("get books in English.");
    data = "data.json";
    lang = "en";
    fetch_data(data);
  } else {
    console.log("get books in Spanish.");
    data = "data.json";
    lang = "es";
    fetch_data(data);
  }
}

function fetch_data(data) {
  fetch(data).then(onDataFetched).catch(onDataFetchFailed);
}

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
  console.log(data);
  books = data.books;
  console.log(books);
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
    flipContainer.setAttribute("data-title", books[i][keys_array[2]]);

    var flipper = document.createElement("div");
    flipper.classList.add("flipper");
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

    front.appendChild(img);
    back.append(title);
    back.append(description);
    back.append(button);

    flipper.appendChild(front);
    flipper.appendChild(back);
    flipContainer.appendChild(flipper);
    document.getElementById("allbooks").appendChild(flipContainer);
  }
}

var searchBar = document.forms["filterbox"].querySelector("#myInput");
searchBar.addEventListener("keyup", function (e) {
  var term = e.target.value.toLowerCase();
  books.forEach(function (book) {
    var bookInHTML = document.querySelector(
      '[data-title="' + book[keys_array[2]] + '"]'
    );
    console.log(bookInHTML);
    if (book[keys_array[2]].toLowerCase().indexOf(term) != -1) {
      bookInHTML.style.display = "block";
    } else {
      bookInHTML.style.display = "none";
    }
  });
});
