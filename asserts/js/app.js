function copyDataToArray() {
  const storedProductsJSON = localStorage.getItem("productsData");

  if (storedProductsJSON) {
    const copiedArray = JSON.parse(storedProductsJSON);
    console.log("Data copied to array:", copiedArray);
    return copiedArray;
  } else {
    console.log("No data found in local storage.");
    return [];
  }
}

const productsContainer = document.querySelector(".order-section");
/* const iconCart = document.querySelector(".totalQuantity");
 */ const openShopping = document.querySelector(".iconCart");
const closeShopping = document.querySelector(".closeShopping");
const body = document.querySelector("body");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const quantity = document.querySelector(".totalQuantity");

window.addEventListener("DOMContentLoaded", function () {
  displayMenuItem(products);
  displayMenuButtons();
});

function displayMenuItem(menuItems) {
  productsContainer.innerHTML = "";

  menuItems.forEach((value, index) => {
    const itemContainer = document.createElement("div");
    itemContainer.className = "item col-lg-3 col-sm-6 col-xs-5";

    const imageElement = document.createElement("img");
    imageElement.src = value.image;

    const titleElement = document.createElement("div");
    titleElement.className = "title";
    titleElement.textContent = value.name;

    const priceElement = document.createElement("div");
    priceElement.className = "price";
    priceElement.textContent = value.price.toLocaleString();

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Add To Cart";
    buttonElement.addEventListener("click", () => addToCart(index, menuItems));

    itemContainer.appendChild(imageElement);
    itemContainer.appendChild(titleElement);
    itemContainer.appendChild(priceElement);
    itemContainer.appendChild(buttonElement);

    productsContainer.appendChild(itemContainer);
  });
}

function displayMenuButtons() {
  const categoriesContainer = document.querySelector(".categories");
  const categories = [...new Set(products.map((item) => item.category))]; // Use Set to get unique categories
  const categoryBtns = categories
    .map(
      (
        category
      ) => `<button type="button" class="filter-btn" data-id=${category}>
            ${category}
          </button>`
    )
    .join("");

  categoriesContainer.innerHTML = categoryBtns;
  const filterBtns = categoriesContainer.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory =
        category === "All"
          ? products
          : products.filter((item) => item.category === category);
      displayMenuItem(menuCategory);
    });
  });
}

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let listCards = [];

function addToCart(key, menuItems) {
  const selectedItem = menuItems[key];
  if (!isExit(selectedItem)) {
    const newItem = { ...selectedItem, quantity: 1 };
    listCards.push(newItem);
  }
  reloadCard();
}

function isExit(selectedItem) {
  return listCards.some((item) => item.code === selectedItem.code);
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCards.forEach((value, key) => {
    totalPrice += value.price * value.quantity;
    count += value.quantity;

    const newDiv = document.createElement("li");
    const imageDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const priceDiv = document.createElement("div");
    const quantityDiv = document.createElement("div");
    const decreaseButton = document.createElement("button");
    const countDiv = document.createElement("div");
    const increaseButton = document.createElement("button");

    imageDiv.innerHTML = `<img src="image/${value.image}"/>`;
    nameDiv.textContent = value.name;
    priceDiv.textContent = value.price.toLocaleString();
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () =>
      changeQuantity(key, value.quantity - 1)
    );
    countDiv.className = "count";
    countDiv.textContent = value.quantity;
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () =>
      changeQuantity(key, value.quantity + 1)
    );

    newDiv.appendChild(imageDiv);
    newDiv.appendChild(nameDiv);
    newDiv.appendChild(priceDiv);
    quantityDiv.appendChild(decreaseButton);
    quantityDiv.appendChild(countDiv);
    quantityDiv.appendChild(increaseButton);
    newDiv.appendChild(quantityDiv);

    listCard.appendChild(newDiv);
  });

  total.innerText = totalPrice.toLocaleString();
  if (count) {
    quantity.innerText = count;
  }
}

function changeQuantity(key, quantity) {
  if (quantity <= 0) {
    listCards.splice(key, 1);
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * listCards[key].price;
  }
  reloadCard();
}

const products = copyDataToArray();
