//searching the foods by clicking search button
const clickButton = () => {
  const searchValue = document.getElementById("searchBox").value;
  const searchFood = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
  fetch(searchFood)
    .then((res) => res.json())
    .then((data) => {
      showMeals(data.meals);
    })
    .catch((error) => {
      showError();
    });
};
//showing related meals
const showMeals = (meals) => {
  deletePreviousData();
  const allFoods = document.getElementById("showFoods");
  const containAllSingleFoodContainer = document.createElement("div");
  containAllSingleFoodContainer.className = "designAllSingleContainer";
  meals.forEach((meal) => {
    const singleFood = document.createElement("div");
    singleFood.className = "singleFoodCart";
    const singleFoodDetailUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}`;
    const foodArea = `
    <div class="btn" onclick="singleFoodDetailCall('${singleFoodDetailUrl}')">
      <div class="divUpper">
        <img class="fixImg" src="${meal.strMealThumb}" alt="" />
      </div>
      <div class="divLower">
        <p class="mealName">${meal.strMeal}</p>
      </div>
    </div>
    `;
    singleFood.innerHTML = foodArea;
    containAllSingleFoodContainer.appendChild(singleFood);
  });
  allFoods.appendChild(containAllSingleFoodContainer);
};
//calling particular food to show details
const singleFoodDetailCall = (singleMealUrl) => {
  fetch(singleMealUrl)
    .then((res) => res.json())
    .then((data) => {
      singleFoodDetailShow(data.meals[0]);
    });
};
//showing particular food details
const singleFoodDetailShow = (singleFoodDetail) => {
  const foodDetailDiv = document.getElementById("foodDetail");
  foodDetailDiv.innerHTML = "";
  const imgDiv = document.createElement("div");
  const leftDiv = document.createElement("div");
  const rightDiv = document.createElement("div");
  const leftAndRightMergeDiv = document.createElement("div");
  leftAndRightMergeDiv.className = "left-right-merge";
  rightDiv.className = "fixRightDiv";
  const upperDiv = `
    <div>
    <img class="detailImg" src="${singleFoodDetail.strMealThumb}">
    <h3 class="mt-2">${singleFoodDetail.strMeal}</h3>
    <h6 class="mt-4">Ingredients</h6>
    </div>
  `;
  imgDiv.innerHTML = upperDiv;
  for (let i = 1; i <= 20; i++) {
    const newDiv = document.createElement("div");
    const ingredientDetail = `strIngredient${i}`;
    const measureDetail = `strMeasure${i}`;
    const ingredientValue = singleFoodDetail[`${ingredientDetail}`];
    const measureValue = singleFoodDetail[`${measureDetail}`];
    if (ingredientValue == null || ingredientValue.length == "") {
      continue;
    }
    const elementOfDiv = `
      <div class="mt-2">
        <i class="fas fa-check-square" style="color:#F06C4E;"></i>
        <small class="ingredients-text-col">${measureValue} ${ingredientValue}</small>
      </div>
      `;
    if (i <= 10) {
      newDiv.innerHTML = elementOfDiv;
      leftDiv.appendChild(newDiv);
    } else {
      newDiv.innerHTML = elementOfDiv;
      rightDiv.appendChild(newDiv);
    }
  }
  foodDetailDiv.appendChild(imgDiv);
  leftAndRightMergeDiv.appendChild(leftDiv);
  leftAndRightMergeDiv.appendChild(rightDiv);
  foodDetailDiv.appendChild(leftAndRightMergeDiv);
};
//error showing area
const showError = () => {
  const showArea = document.getElementById("showFoods");
  showArea.innerHTML = `
    <h1 class="errorShow">Sorry, This food does not exist. Please try again!</h1>
  `;
};
//deleting previous data
const deletePreviousData = () => {
  document.getElementById("showFoods").innerHTML = "";
  document.getElementById("foodDetail").innerHTML = "";
};
