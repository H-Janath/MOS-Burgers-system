import { products } from "./item-list.js";

const productsContainer = document.querySelector(".order-section");
let iconCart = document.querySelector(".totalQuantity");
let openShopping = document.querySelector(".iconCart");
let closeShopping = document.querySelector(".closeShopping");
let body = document.querySelector("body");
let listCard = document.querySelector(".listCard");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

window.addEventListener("DOMContentLoaded", function () {
  let listCards = [];
  function addToCard(key) {
    if (listCards[key] == null) {
      // copy product form list to list card
      iconCart[key] = JSON.parse(JSON.stringify(products[key]));
      iconCart[key].quantity = 1;
    }
    reloadCard();
  }
  function reloadCard() {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
      totalPrice = totalPrice + value.price;
      count = count + value.quantity;
      if (value != null) {
        let newDiv = document.createElement("li");
        newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
          value.quantity - 1
        })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
          value.quantity + 1
        })">+</button>
                </div>`;
        listCard.appendChild(newDiv);
      }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
  }
  function changeQuantity(key, quantity) {
    if (quantity == 0) {
      delete listCards[key];
    } else {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
  }

  displayMenuItem(products);
  displayMenuButtons();
});

/* Display menu items */
function displayMenuItem(menuitems) {
  let displayMenu = menuitems.map((value, index) => {
    return `
  <div class="item col-lg-3  col-sm-4 col-xs-5">
  <img src="${value.image}">
  <div class="title">${value.name}</div>
  <div class="price">${value.price.toLocaleString()}</div>
  <button onclick="addToCard(${index})">Add To Card</button>
  </div>
  `;
  });
  displayMenu = displayMenu.join("");
  productsContainer.innerHTML = displayMenu;
}

/* Display buttons */
function displayMenuButtons() {
  const categoriesContainer = document.querySelector(".categories");
  const categories = products.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["All"]
  );
  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="filter-btn" data-id=${category}>
            ${category}
          </button>`;
    })
    .join("");

  categoriesContainer.innerHTML = categoryBtns;
  const filterBtns = categoriesContainer.querySelectorAll(".filter-btn");
  console.log(filterBtns);

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = products.filter(function (menuitems) {
        if (menuitems.category === category) {
          return menuitems;
        }
      });
      if (category === "All") {
        displayMenuItem(products);
      } else {
        displayMenuItem(menuCategory);
      }
    });
  });
}
openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

/* close.addEventListener("click", function () {
  cart.style.right = "-100%";
  container.style.transform = "translateX(0)";
}); */
