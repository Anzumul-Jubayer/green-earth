//categories
const loadCategories=(()=>{
    const url='https://openapi.programming-hero.com/api/categories'
    fetch(url).then((response)=>response.json()).then((data)=>showCategories(data.categories)).catch((err)=>console.log(err))
})
const showCategories=((categories)=>{
    const categoriesDiv=document.getElementById('categories-div')
    categories.forEach(el => {  
       const categoriesContainer=document.getElementById('categories-container')
       categoriesContainer.innerHTML+=`
        <a class="my-2 block pl-3 py-1 hover:bg-green-700 hover:text-white cursor-pointer">${el.category_name}</a>
       `
      categoriesDiv.appendChild(categoriesContainer) 
    });
    
})
// All Plants
const loadAllPlants=(()=>{
    const url='https://openapi.programming-hero.com/api/plants'
    fetch(url).then((response)=>response.json()).then((data)=>{
        showAllPlants(data.plants)
    })
})
const showAllPlants=((plants)=>{
    const allTree=document.getElementById('all-trees')
    allTree.classList.add('bg-green-700', 'text-white');
    const cardDiv=document.getElementById('card-div')
    cardDiv.innerHTML=""
   plants.forEach((plant)=>{
     cardDiv.innerHTML+=` <div class="card bg-base-100 p-3 shadow-sm">
            <figure>
              <img
                src="${plant.image}"
                class=" w-full h-50"
              />
            </figure>
            <div class="card-body px-2">
              <h2 class="card-title">${plant.name}</h2>
              <p>
               ${plant.description}
              </p>
              <div class="flex justify-between items-center">
                <div
                  class="bg-[#dcfce7] text-green-700 font font-semibold p-2 rounded-2xl"
                >
                  <p>${plant.category}</</p>
                </div>
                <h3 class="font-semibold">
                  <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}
                </h3>
              </div>
              <div class="mt-6">
                <button
                  class="btn bg-green-700 btn-block rounded-2xl text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>`
   })
})









// function call
loadAllPlants()
loadCategories()

