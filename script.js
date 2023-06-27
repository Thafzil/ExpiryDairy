const searchInput = document.getElementById("searchInput");
const autocompleteItems = document.getElementById("autocompleteItems");
const searchButton = document.getElementById("searchButton");
const addItemButton = document.getElementById("addItemButton");
const addItemPopup = document.getElementById("addItemPopup");
const newItemNameInput = document.getElementById("newItemNameInput");
const newItemExpiryInput = document.getElementById("newItemExpiryInput");
const saveItemButton = document.getElementById("saveItemButton");
const cancelItemButton = document.getElementById("cancelItemButton");
const selectedItemContainer = document.getElementById("selectedItemContainer");
const selectedItemName = document.getElementById("selectedItemName");
const selectedItemExpiry = document.getElementById("selectedItemExpiry");
const expiryList = document.getElementById("expiryList");
const refresh = document.getElementById("refresh");

const suggestionList = [
  { name: "Apple", expiry: "2023-06-30" },
  { name: "Banana", expiry: "2023-07-02" },
  { name: "Cherry", expiry: "2023-07-05" },
  { name: "Grape", expiry: "2023-07-01" },
  { name: "Lemon", expiry: "2023-06-28" },
  { name: "Orange", expiry: "2023-07-03" },
  { name: "Peach", expiry: "2023-06-29" },
  { name: "Pear", expiry: "2023-07-04" },
  { name: "Strawberry", expiry: "2023-07-06" },
  { name: "Watermelon", expiry: "2023-07-07" },
];

searchInput.addEventListener("input", function () {
  const searchText = this.value.trim();

  // Clear previous results
  autocompleteItems.innerHTML = "";

  if (searchText.length > 0) {
    // Filter autocomplete suggestions based on input
    const filteredSuggestions = getSuggestionsFromServer(searchText);

    filteredSuggestions.forEach(function (suggestion) {
      const item = document.createElement("div");
      item.classList.add("autocomplete-item");
      item.textContent = suggestion.name;
      item.addEventListener("click", function () {
        // Set the selected suggestion as the search input value
        searchInput.value = suggestion.name;
        autocompleteItems.innerHTML = "";

        // Display the selected item with name and expiry
        selectedItemName.textContent = suggestion.name;
        selectedItemExpiry.textContent = "Expiry: " + suggestion.expiry;
        selectedItemContainer.style.display = "block";
      });
      autocompleteItems.appendChild(item);
    });
  }
});

searchButton.addEventListener("click", function () {
  const searchText = searchInput.value.trim();
  if (searchText.length > 0) {
    console.log("Search triggered with:", searchText);
    // Call your search function or perform any desired action here
  }
});

addItemButton.addEventListener("click", function () {
  addItemPopup.style.display = "flex";
});

cancelItemButton.addEventListener("click", function () {
  addItemPopup.style.display = "none";
});

saveItemButton.addEventListener("click", function () {
  const newItemName = newItemNameInput.value.trim();
  const newItemExpiry = newItemExpiryInput.value;
  if (newItemName.length > 0 && newItemExpiry) {
    suggestionList.push({ name: newItemName, expiry: newItemExpiry });

    addItemPopup.style.display = "none";
    newItemNameInput.value = "";
    newItemExpiryInput.value = "";
  }
});

function getSuggestionsFromServer(searchText) {
  return suggestionList.filter(function (suggestion) {
    return suggestion.name.toLowerCase().startsWith(searchText.toLowerCase());
  });
}

function getExpiryItems() {
  console.log("aaa");
  const currentDate = new Date();
  const sortedExpiryList = suggestionList
    .filter(function (suggestion) {
      const expiryDate = new Date(suggestion.expiry);
      return expiryDate > currentDate;
    })
    .sort(function (a, b) {
      const expiryDateA = new Date(a.expiry);
      const expiryDateB = new Date(b.expiry);
      return expiryDateA - expiryDateB;
    })
    .slice(0, 10);

  expiryList.innerHTML = "";

  sortedExpiryList.forEach(function (item) {
    const expiryItem = document.createElement("div");
    expiryItem.classList.add("expiry-item");

    const expiryItemName = document.createElement("div");
    expiryItemName.classList.add("expiry-item-name");
    expiryItemName.textContent = item.name;

    const expiryItemExpiry = document.createElement("div");
    expiryItemExpiry.classList.add("expiry-item-expiry");
    expiryItemExpiry.textContent = "Expiry: " + item.expiry;

    expiryItem.appendChild(expiryItemName);
    expiryItem.appendChild(expiryItemExpiry);

    expiryList.appendChild(expiryItem);
  });
}

document.addEventListener("click", function (event) {
  // Check if the clicked element or its ancestors contain the ignore class
  if (
    !event.target.closest("#addItemButton") &&
    !event.target.closest(".add-item-popup") &&
    addItemPopup.style.display == "flex"
  ) {
    // Call your method or execute your code here
    console.log("Method executed");
    addItemPopup.style.display = "none";
  }
});
getExpiryItems();
refresh.onclick = function () {
  getExpiryItems();
};
