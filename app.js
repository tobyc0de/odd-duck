console.log("hello");
let productContainer = document.querySelector("#productContainer");
let image1 = document.querySelector("#productContainer img:nth-child(1)");
let image2 = document.querySelector("#productContainer img:nth-child(2)");
let image3 = document.querySelector("#productContainer img:nth-child(3)");
let chartsection = document.querySelector("#chartsection");
let remainingClicks;
const remainingClicksDiv = document.getElementById("remaining-clicks");
let userClicks;
const maxClicks = 20;
let currentProduct1;
let currentProduct2;
let currentProduct3;
const allProducts = [];
function Product(name, views, clicks) {
  this.name = name;
  this.src = `./img/${name}.jpg`;
  this.views = views;
  this.clicks = clicks;
  allProducts.push(this);
}

checkLocal();

function checkLocalUserClicks() {
  const userClicksFromLS = JSON.parse(localStorage.getItem("userClicksFromLS"));
  if (userClicksFromLS) {
    userClicks = userClicksFromLS;
    remainingClicks = maxClicks - userClicks;
    remainingClicksDiv.textContent = `Remaining Clicks: ${remainingClicks}`;
    if (userClicks >= maxClicks) {
      updateStats();
    }
  } else {
    userClicks = 0;
    remainingClicks = maxClicks - userClicks;
    remainingClicksDiv.textContent = `Remaining Clicks: ${remainingClicks}`;
  }
}

function checkLocal() {
  const productsFromLS = JSON.parse(localStorage.getItem("productsFromLS"));
  // if there is nothing in localStorage for the products:
  // instantiate my default products (0 views and clicks)
  if (localStorage.getItem("productsFromLS") === null) {
    new Product("bag", 0, 0);
    new Product("banana", 0, 0);
    new Product("bathroom", 0, 0);
    new Product("boots", 0, 0);
    new Product("breakfast", 0, 0);
    new Product("bubblegum", 0, 0);
    new Product("chair", 0, 0);
    new Product("cthulhu", 0, 0);
    new Product("dog-duck", 0, 0);
    new Product("dragon", 0, 0);
    new Product("pen", 0, 0);
    new Product("pet-sweep", 0, 0);
    new Product("scissors", 0, 0);
    new Product("shark", 0, 0);
    new Product("sweep", 0, 0);
    new Product("tauntaun", 0, 0);
    new Product("unicorn", 0, 0);
    new Product("water-can", 0, 0);
    new Product("wine-glass", 0, 0);
  } else {
    for (let i = 0; i < productsFromLS.length; i++) {
      new Product(
        productsFromLS[i].name,
        productsFromLS[i].views,
        productsFromLS[i].clicks
      );
    }
  }
}

// function to choose a random product
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

// function to render 3 random products
function renderProducts() {
  let product1Index = getRandomIndex();
  let product2Index = getRandomIndex();
  let product3Index = getRandomIndex();

  // prevent repeated images after clicks
  while (
    product3Index === currentProduct1 ||
    product3Index === currentProduct2 ||
    product3Index === currentProduct3
  ) {
    product3Index = getRandomIndex();
  }

  while (
    product1Index === currentProduct1 ||
    product1Index === currentProduct2 ||
    product1Index === currentProduct3
  ) {
    product1Index = getRandomIndex();
  }

  while (
    product2Index === currentProduct1 ||
    product2Index === currentProduct2 ||
    product2Index === currentProduct3
  ) {
    product2Index = getRandomIndex();
  }

  // prevent them from being the same
  while (
    product1Index === product2Index ||
    product1Index === product3Index ||
    product2Index === product3Index
  ) {
    product2Index = getRandomIndex();
    product3Index = getRandomIndex();
  }

  image1.src = allProducts[product1Index].src;
  image2.src = allProducts[product2Index].src;
  image3.src = allProducts[product3Index].src;
  image1.alt = allProducts[product1Index].name;
  image2.alt = allProducts[product2Index].name;
  image3.alt = allProducts[product3Index].name;
  allProducts[product1Index].views++;
  allProducts[product2Index].views++;
  allProducts[product3Index].views++;
  currentProduct1 = product1Index;
  currentProduct2 = product2Index;
  currentProduct3 = product3Index;
}

function showStatsBtn() {
  let resultsBtn = document.querySelector("#showResultsBtn");
  resultsBtn.style.display = "inherit";
}

function handleProductClick(event) {
  let clickedProduct = event.target.alt;

  if (userClicks >= maxClicks - 1) {
    productContainer.remove();
    remainingClicksDiv.remove();
    showStatsBtn();
  } else {
    if (event.target === productContainer) {
      alert("please click on an image");
    } else {
      renderProducts();
      userClicks++;
      remainingClicks = maxClicks - userClicks;
      remainingClicksDiv.textContent = `Remaining Clicks: ${remainingClicks}`;
      putIntoLocalStorage();
    }
  }

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;

      break;
    }
  }
}

productContainer.addEventListener("click", handleProductClick);
const ctx = document.getElementById("myChart");
const productNames = [];
const productClicks = [];
const productViews = [];
const productCTRs = [];

function updateStats() {
  for (i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productClicks.push(allProducts[i].clicks);
    productViews.push(allProducts[i].views);
    productCTRs.push((allProducts[i].clicks / allProducts[i].views) * 10);
  }
  console.log(
    "stats productNames, ProductClicks, ProductViews and ProductCTRs updated and pushed in to allProducts"
  );
}

function putIntoLocalStorage() {
  const productsStringified = JSON.stringify(allProducts);
  localStorage.setItem("productsFromLS", productsStringified);
  const userClicksStringified = JSON.stringify(userClicks);
  localStorage.setItem("userClicksFromLS", userClicksStringified);
  console.log(
    "allProducts and userClicksFromLS stringified and saved in LocalStorage"
  );
}
checkLocalUserClicks();

renderProducts();

function reset() {
  userClicks = 0;
  localStorage.removeItem("productsFromLS");
  localStorage.removeItem("userClicksFromLS");
  location.reload();
}

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", reset);
