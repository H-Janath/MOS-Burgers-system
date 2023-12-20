let products = copyDataToArray();
function copyDataToArray() {
  // Retrieve the JSON string from local storage
  const storedProductsJSON = localStorage.getItem("productsData");

  // Check if there is any data in local storage
  if (storedProductsJSON) {
    // Parse the JSON string into an array
    const copiedArray = JSON.parse(storedProductsJSON);

    // Now, you can use the copiedArray as needed
    console.log("Data copied to array:", copiedArray);

    return copiedArray;
  } else {
    console.log("No data found in local storage.");
    return [];
  }
}
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

    cellCode.textContent = item.code;
    cellName.textContent = item.name;
    cellPrice.textContent = item.price;
    cellCategory.textContent = item.category;

    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteItem(index);
    cellAction.appendChild(deleteButton);
    //create edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editItem(index);
    cellAction.appendChild(editButton);
  });
}
const btnsection = document.getElementById("add-btn");
//create add-button
const addbutton = document.createElement("button");
addbutton.textContent = "Add item";
addbutton.onclick = () => addItem();
btnsection.appendChild(addbutton);

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
  updateArray();
  displayItems();

  // Clear the input fields
  document.getElementById("itemCode").value = "";
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemCategory").value = "";
}
function updateArray() {
  localStorage.setItem("productsData", JSON.stringify(products));
}
function deleteItem(index) {
  products.splice(index, 1);
  updateArray();
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
    updateArray();
    displayItems();
  }
}

displayItems();
