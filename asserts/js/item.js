// Function to display array items in a table
import { products } from "./item-list.js";

function displayItems() {
  const tableBody = document.getElementById("arrayTable");
  tableBody.innerHTML = "";

  products.forEach((item, index) => {
    const row = tableBody.insertRow();
    const cellCode = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellPrice = row.insertCell(2);
    const cellCategory = row.insertCell(3);
    const cellAction = row.insertCell(4);

    cellCode.innerHTML = item.code;
    cellName.innerHTML = item.name;
    cellPrice.innerHTML = item.price;
    cellCategory.innerHTML = item.category;
    cellAction.innerHTML = `<button onclick="editItem(${index})">Edit</button>
                                  <button onclick="deleteItem(${index})">Delete</button>`;
  });
}
function addItem() {
  const itemCode = document.getElementById("itemCode").value;
  const itemName = document.getElementById("itemName").value;
  const itemPrice = document.getElementById("itemPrice").value;
  const itemCategory = document.getElementById("itemCategory").value;

  products.push({
    code: itemCode,
    name: itemName,
    image: "",
    price: parseFloat(itemPrice), // Convert to float
    category: itemCategory,
  });
  displayItems();

  // Clear the input fields
  document.getElementById("itemCode").value = "";
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemCategory").value = "";
}

function deleteItem(index) {
  products.splice(index, 1);
  displayItems();
}

function editItem(index) {
  const newCode = prompt("Enter new code:", products[index].code);
  const newName = prompt("Enter new name:", products[index].name);
  const newPrice = parseFloat(
    prompt("Enter new price:", products[index].price)
  );
  const newCategory = prompt("Enter new category:", products[index].category);

  if (
    newCode !== null &&
    newName !== null &&
    !isNaN(newPrice) &&
    newCategory !== null
  ) {
    products[index].code = newCode;
    products[index].name = newName;
    products[index].price = newPrice;
    products[index].category = newCategory;
    displayItems();
  }
}

displayItems();
