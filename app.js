console.log("hello");
let productContainer = document.querySelector("#productContainer");
let image1 = document.querySelector("#productContainer img:nth-child(1)");
let image2 = document.querySelector("#productContainer img:nth-child(2)");
let image3 = document.querySelector("#productContainer img:nth-child(3)");
let chartsection = document.querySelector("#chartsection");
let userClicks = 0;
let maxClicks = 25;
let currentProduct1;
let currentProduct2;
let currentProduct3;

function Product(name, src, views, clicks) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
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

function handleProductClick(event) {
  const remainingClicksDiv = document.getElementById("remaining-clicks");
  if (userClicks >= maxClicks - 1) {
    updateStats();
    showResults();
    productContainer.remove();
    chartsection.style.display = "flex";
  }
  let clickedProduct = event.target.alt;
  if (event.target === productContainer) {
    alert("please click on an image");
  } else {
    renderProducts();
    userClicks++;
    let remainingClicks = maxClicks - userClicks;
    remainingClicksDiv.textContent = `Remaining Clicks: ${remainingClicks}`;
    console.log(`userclicks: ${userClicks}`);
  }

  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;

      break;
    }
  }
}

// make products
const allProducts = [
  new Product("bag", "./img/bag.jpg"),
  new Product("banana", "./img/banana.jpg"),
  new Product("bathroom", "./img/bathroom.jpg"),
  new Product("boots", "./img/boots.jpg"),
  new Product("breakfast", "./img/breakfast.jpg"),
  new Product("bubblegum", "./img/bubblegum.jpg"),
  new Product("chair", "./img/chair.jpg"),
  new Product("cthulhu", "./img/cthulhu.jpg"),
  new Product("dog-duck", "./img/dog-duck.jpg"),
  new Product("dragon", "./img/dragon.jpg"),
  new Product("pen", "./img/pen.jpg"),
  new Product("pet-sweep", "./img/pet-sweep.jpg"),
  new Product("scissors", "./img/scissors.jpg"),
  new Product("shark", "./img/shark.jpg"),
  new Product("sweep", "./img/sweep.png"),
  new Product("tauntaun", "./img/tauntaun.jpg"),
  new Product("water-can", "./img/water-can.jpg"),
  new Product("unicorn", "./img/unicorn.jpg"),
  new Product("wine-glass", "./img/wine-glass.jpg"),
];

productContainer.addEventListener("click", handleProductClick);

function showResults() {
  const config = new Chart(ctx, {
    data: {
      labels: productNames,
      datasets: [
        {
          type: "bar",
          label: "# of views",
          data: productViews,
          borderWidth: 6,
        },
        {
          type: "bar",
          label: "# of clicks",
          data: productClicks,
          borderWidth: 6,
        },
        {
          type: "line",
          label: "CTR in 10%",
          data: productCTRs,
          borderWidth: 6,
        },
      ],
    },
  });
}

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

    console.log(productViews);
  }
}

renderProducts();
