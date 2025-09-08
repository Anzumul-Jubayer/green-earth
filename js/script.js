// Declare
const categoriesContainer = document.getElementById("categories-container");
const cardDiv = document.getElementById("card-div");
const cartDiv = document.getElementById("cart-div");

// spinner
const showLoading = () => {
  cardDiv.innerHTML = `<h1 class="text-center text-2xl col-span-full">
    <span class="loading loading-spinner loading-xl"></span>
  </h1>`;
};

// categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((err) => alert("❌ failed"));
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
  if (allTrees) {
    allTrees.classList.add("bg-green-700", "text-white");
  }
};

// all plants
const loadAllPlants = () => {
  showLoading();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => showTreeCategories(data.plants))
    .catch((err) => alert("❌ failed"));
};

// category plants
const loadPlantsByCategory = (id) => {
  showLoading();
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => showTreeCategories(data.plants))
    .catch((err) => alert("❌ failed"));
};

// Show plants
const showTreeCategories = (plants) => {
  cardDiv.innerHTML = "";
  plants.forEach((plant) => {
    cardDiv.innerHTML += `
      <div class="card bg-base-100 p-3 shadow-sm">
        <figure>
          <img src="${plant.image}" class="w-full h-56 object-cover" />
        </figure>
        <div class="card-body px-2">
          <h2  class="card-title"> <span onclick="loadTreeDetails(${plant.id})" class="cursor-pointer"> ${plant.name}</span> </h2>
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
    const selectorA = categoriesContainer.querySelectorAll("a");
    for (let a of selectorA) {
      a.classList.remove("bg-green-700", "text-white");
    }
    event.target.classList.add("bg-green-700", "text-white");
    const id = event.target.getAttribute("id");
    if (id === "all-trees") {
      loadAllPlants();
    } else {
      loadPlantsByCategory(id);
    }
  }
});

// modal
const loadTreeDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTreeDetails(data.plants);
    })
    .catch((err) => alert("❌ failed"));
};

const showTreeDetails = (plant) => {
  const treeDetails = document.getElementById("tree-details-content");
  treeDetails.innerHTML = `
    <img src="${plant.image}" alt="${plant.name}" class=" h-60 w-full object-cover mx-auto mb-3 rounded-lg">
    <h3 class="text-lg font-bold">${plant.name}</h3>
    <p class="text-gray-600 mb-2">${plant.category}</p>
    <p class="py-2">${plant.description}</p>
    <p class="font-semibold text-green-600 bg-[#dcfce7] p-2 rounded-2xl w-fit">${plant.category}</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  `;
  document.getElementById("tree-details").showModal();
};

// cart functionality
let total = 0;
let cartItems = {};
cardDiv.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const getTitle = event.target.parentNode.parentNode.children[0].innerText;
    alert(`${getTitle} has been added to cart`)
    const getPrice =
      event.target.parentNode.parentNode.children[2].children[1].innerText;
    const priceNumber = parseInt(getPrice);
    if (!cartItems[getTitle]) {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="flex justify-between items-center bg-green-100 p-3 rounded-lg my-3">
            <div>
              <h2 class="font-semibold">${getTitle}</h2>
              <p class="text-gray-400"><i class="fa-solid fa-bangladeshi-taka-sign"></i>  ${getPrice} x 1</p>
            </div>
            <h2>
             <span class="del-btn cursor-pointer"> ❌ </span>
            </h2>
           </div>
     `;
      cartDiv.appendChild(div);

      div.querySelector(".del-btn").addEventListener("click", () => {
        total -= priceNumber * cartItems[getTitle].count;
        div.innerHTML = "";
        delete cartItems[getTitle];
        document.getElementById("total-value").innerText = total;
      });
      cartItems[getTitle] = { count: 1, price: priceNumber, element: div };
    } else {
      cartItems[getTitle].count += 1;
      const p = cartItems[getTitle].element.querySelector("p");
      p.innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign"></i> ${getPrice} x ${cartItems[getTitle].count}`;
    }

    total += priceNumber;
    document.getElementById("total-value").innerText = total;
  }
});

//function call
loadCategories();
loadAllPlants();

