

// function Search(){
//     let Search = document.querySelector('input').value
//     console.log(Search);
//     recipe(Search)
//   }
// function recipe(input){  

//     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.meals[0].strMeal);
//       showresult(data)
//     })
//     .catch((error) => {
//       console.log(error);
//     }); 
// }

// function showresult(item){
//     let myMeal = item.meals[0];
//         console.log(myMeal);
    
//     let div =document.createElement('div')
//     let btn = document.createElement('button')
//     btn.setAttribute('class','btns')
//     let dish_name =document.createElement('p')
//     dish_name.innerText = myMeal.strMeal

//     let Category =document.createElement('p')
//     Category.innerText = myMeal.strCategory

//     let Area =document.createElement('p')
//     Area.innerText = myMeal.strArea

//     // let Instructions =document.createElement('p')
//     // Instructions.innerText = myMeal.strInstructions


//     let count = 1;
//     let ingredients = [];
//     for (let i in myMeal) {
//       let ingredient = "";
//       let measure = "";
//       if (i.startsWith("strIngredient") && myMeal[i]) {
//         ingredient = myMeal[i];
//         measure = myMeal[`strMeasure` + count];
//         count += 1;
//         ingredients.push(`${measure} ${ingredient}`);
//       }
//     }
//     console.log(ingredients);

//    let button=  document.querySelector('.btns')
//    button.addEventListener('click' ,()=>{
    
//    })



//     div.append(dish_name , Category ,Area , btn )

    
//     document.querySelector('#result').append(div)


// }
//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb);
        console.log(myMeal.strMeal);
        console.log(myMeal.strArea);
        console.log(myMeal.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);

        result.innerHTML = `
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
    `;
        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  }
});