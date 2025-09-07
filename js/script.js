// Declare
const categoriesContainer = document.getElementById('categories-container');
const cardDiv = document.getElementById('card-div');

// categories
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => showCategories(data.categories))
    .catch(err => console.error(err));
};

// Show categories
const showCategories = (categories) => {
  categoriesContainer.innerHTML = `
    <a id="all-trees" class="my-2 block pl-3 py-1 cursor-pointer hover:bg-green-700 hover:text-white ">All Trees</a>
  `;
  categories.forEach(cat => {
    categoriesContainer.innerHTML += `
      <a id="${cat.id}" class="my-2 block pl-3 py-1 cursor-pointer hover:bg-green-700 hover:text-white">${cat.category_name}</a>
    `;
  });

  const allTrees = document.getElementById('all-trees');
  if(allTrees) allTrees.classList.add('bg-green-700','text-white');
};

const loadTreeCategories = (id) => {
  const url = id 
    ? `https://openapi.programming-hero.com/api/category/${id}` 
    : `https://openapi.programming-hero.com/api/plants`;

  fetch(url)
    .then(res => res.json())
    .then(data => showTreeCategories(data.plants))
    .catch(err => console.error(err));
};

// Show plants
const showTreeCategories = (plants) => {
  cardDiv.innerHTML = "";
  plants.forEach(plant => {
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
  if(event.target.tagName === "A") {
    categoriesContainer.querySelectorAll('a').forEach(a => {
      a.classList.remove('bg-green-700','text-white');
    });
    event.target.classList.add('bg-green-700','text-white');
    const id = event.target.getAttribute("id");
    loadTreeCategories(id === "all-trees" ? "" : id);
  }
});

//function call
loadCategories();
loadTreeCategories();
