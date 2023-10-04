const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

// make sure the user only has 25 clicks
let userClicks = 0;
const maxClicks = 5;

const products = [];
const productsFromLS = JSON.parse(localStorage.getItem("productsfromLS"));

// a constructor that makes product objects
function Product(name, views, clicks) {
  this.name = name;
  this.src = `./img/${name}.jpg`;
  this.views = views;
  this.clicks = clicks;
  // take the new object that is created, and put it into the array
  products.push(this);
}

// if there is nothing in localStorage for the products:
// instantiate my default products (0 views and clicks)
if (!productsFromLS) {
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
  for (let i = 0; i < products.length; i++) {
    const newProduct = new Product(
      products[i].name,
      products[i].views,
      products[i].clicks
    );
    products.push(newChar);
  }
}

// function that randomly gets a index for an item in item
function randomProdIdx() {
  return Math.floor(Math.random() * products.length);
}

// make a function that puts 3 random products on the page (using the 3 img tags)
function renderProducts() {
  // get 3 indexs from our products array
  let prod1 = randomProdIdx();
  let prod2 = randomProdIdx();
  let prod3 = randomProdIdx();

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

  // make sure they aren't the same
  while (prod1 === prod2 || prod1 === prod3 || prod2 === prod3) {
    prod2 = randomProdIdx();
    prod3 = randomProdIdx();
  }

  // change the src and alt attributes of our img tags
  img1.src = products[prod1].src;
  img2.src = products[prod2].src;
  img3.src = products[prod3].src;
  img1.alt = products[prod1].name;
  img2.alt = products[prod2].name;
  img3.alt = products[prod3].name;

  // increase the views of the displayed objects
  products[prod1].views++;
  products[prod2].views++;
  products[prod3].views++;
}

// handle what happens when click the image
// the "clicks" property of the image I click to go up by one
// render 3 new images
function handleImgClick(event) {
  // check if the user has run out of clicks
  if (userClicks === maxClicks) {
    renderChart();
    putIntoLocalStorage();
    return; // end the function here and don't run the rest
  }

  // increase the number of times the user has clicked
  userClicks++;

  // get the name of the clicked product
  let clickedProduct = event.target.alt;

  // increase the clicks of the product
  for (let i = 0; i < products.length; i++) {
    if (clickedProduct === products[i].name) {
      products[i].clicks++;
      break; // break because we found what we are looking for
    }
  }

  // render 3 more images
  renderProducts();
}

img1.addEventListener("click", handleImgClick);
img2.addEventListener("click", handleImgClick);
img3.addEventListener("click", handleImgClick);

// function to create a new chart
function renderChart() {
  const ctx = document.getElementById("myChart");

  const labels = [];
  const views = [];
  const clicks = [];

  // loop through my products array and add in the label, views and clicks data to my arrays
  for (let i = 0; i < products.length; i++) {
    labels.push(products[i].name);
    views.push(products[i].views);
    clicks.push(products[i].clicks);
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of views",
          data: views,
          borderWidth: 1,
        },
        {
          type: "line",
          label: "# of clicks",
          data: clicks,
          borderWidth: 1,
        },
      ],
    },
  });
}

function putIntoLocalStorage() {
  const productsStringified = JSON.stringify(products);
  localStorage.setItem("productsFromLS", productsStringified);
}

renderProducts();