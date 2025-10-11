document.getElementById('goBtn').addEventListener('click', () => {
  const recipe = document.getElementById('recipeSelect').value;
  if (!recipe) {
    alert('Please select a recipe first!');
    return;
  }
  const recipePath = `recipes/${recipe}`;
  window.open(recipePath, '_blank');
});
