console.log("hello");
let chartsection = document.querySelector("#chartsection");
const allProducts = [];
function Product(name, views, clicks) {
  this.name = name;
  this.src = `./img/${name}.jpg`;
  this.views = views;
  this.clicks = clicks;
  allProducts.push(this);
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

const productNames = [];
const productClicks = [];
const productViews = [];
const productCTRs = [];

function showResults() {
  console.log("showresults started");

  // populate the results arrays
  const ctx = document.getElementById("myChart");
  for (i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productClicks.push(allProducts[i].clicks);
    productViews.push(allProducts[i].views);
    productCTRs.push((allProducts[i].clicks / allProducts[i].views) * 10);
  }
  //
  chartsection.style.display = "flex";
  const config = new Chart(ctx, {
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#65c5e7",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#65c5e7", // Color of the x-axis labels
          },
          grid: {
            color: "#65c5e7", // Color of the x-axis grid lines
          },
          border: {
            width: 2,
            color: "#65c5e7", // <-------------- Color of the x-axis
          },
        },
        y: {
          ticks: {
            color: "#65c5e7", // Color of the x-axis labels
          },
          grid: {
            color: "#65c5e7", // Color of the x-axis grid lines
          },
          border: {
            width: 2,
            color: "#65c5e7", // <-------------- Color of the x-axis
          },
        },
      },
    },
    data: {
      labels: productNames,
      datasets: [
        {
          type: "bar",
          label: "# of views",
          data: productViews,
          borderWidth: 6,
          borderColor: "#ffd500",
        },
        {
          type: "bar",
          label: "# of clicks",
          data: productClicks,
          borderWidth: 6,
          borderColor: "#cc3603",
        },
        {
          type: "line",
          label: "CTR in 10%",
          data: productCTRs,
          borderWidth: 6,
          borderColor: "#65c5e7",
          font: {
            weight: "bold",
            size: 26,
          },
        },
      ],
    },
  });
}

checkLocal();
showResults();
