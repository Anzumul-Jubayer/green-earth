// Declare
const categoriesContainer = document.getElementById("categories-container");
const cardDiv = document.getElementById("card-div");
const cartDiv = document.getElementById("cart-div");

// spinner
const showLoading = () => {
  cardDiv.innerHTML = `<h1 class="text-center text-2xl col-span-full">
    Loading <span class="loading loading-spinner loading-xl"></span>
  </h1>`;
};

// categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => console.error(err));
};

// Show categories
const showCategories = (categories) => {
  categoriesContainer.innerHTML = `
    <a id="all-trees" class="my-2 block pl-3 py-1 cursor-pointer hover:bg-green-700 hover:text-white ">All Trees</a>
  `;
  categories.forEach((cat) => {
    categoriesContainer.innerHTML += `
      <a id="${cat.id}" class="my-2 block pl-3 py-1 cursor-pointer hover:bg-green-700 hover:text-white">${cat.category_name}</a>
    `;
  });

  const allTrees = document.getElementById("all-trees");
  if (allTrees) allTrees.classList.add("bg-green-700", "text-white");
};

// all plants
const loadAllPlants = () => {
  showLoading();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => showTreeCategories(data.plants))
    .catch((err) => console.error(err));
};

// category plants
const loadPlantsByCategory = (id) => {
  showLoading();
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => showTreeCategories(data.plants))
    .catch((err) => console.error(err));
};

// Show plants
const showTreeCategories = (plants) => {
  cardDiv.innerHTML = "";
  plants.forEach((plant) => {
    cardDiv.innerHTML += `
      <div class="card bg-base-100 p-3 shadow-sm">
        <figure>
          <img src="${plant.image}" class="w-full h-50" />
        </figure>
        <div class="card-body px-2">
          <h2 class="card-title">${plant.name}</h2>
          <p>${plant.description}</p>
          <div class="flex justify-between items-center">
            <div class="bg-[#dcfce7] text-green-700 font-semibold p-2 rounded-2xl">
              <p>${plant.category}</p>
            </div>
            <h3 class="font-semibold">
              <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}
            </h3>
          </div>
          <div class="mt-6">
            <button class="btn bg-green-700 btn-block rounded-2xl text-white">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
};

categoriesContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    categoriesContainer.querySelectorAll("a").forEach((a) => {
      a.classList.remove("bg-green-700", "text-white");
    });
    event.target.classList.add("bg-green-700", "text-white");
    const id = event.target.getAttribute("id");
    if (id === "all-trees") {
      loadAllPlants();
    } else {
      loadPlantsByCategory(id);
    }
  }
});

// cart functionality
let total = 0;
let cartItems = {};
cardDiv.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn")) return;
  const card = e.target.closest(".card");
  const name = card.querySelector(".card-title").innerText;
  const price = parseInt(card.querySelector("h3").innerText.split(" ").pop());

  if (!cartItems[name]) {
    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-[#F0FDF4] p-3 my-3 rounded-lg";
    div.innerHTML = `<div><h2 class="font-bold mb-2">${name}</h2><p class="text-gray-400"> ${price} x 0</p></div><div><h2 class="remove-btn cursor-pointer">❌</h2></div>`;
    div.querySelector(".remove-btn").onclick = () => {
      total -= cartItems[name].price * cartItems[name].count;
      div.remove();
      delete cartItems[name];
      document.getElementById("total-price").innerText = `${total}`;
    };
    cartDiv.appendChild(div);
    cartItems[name] = { count: 0, price, element: div };
  }

  cartItems[name].count++;
  total += price;
  cartItems[name].element.querySelector("p").innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign"></i> ${price} x ${cartItems[name].count}`;

  document.getElementById("total-price").innerText = `${total}`;
});

//function call
loadCategories();
loadAllPlants();
