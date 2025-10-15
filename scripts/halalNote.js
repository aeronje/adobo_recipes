document.addEventListener("DOMContentLoaded", () => {
  const recipeSelect = document.getElementById("recipeSelect");
  const halalNote = document.querySelector(".halal-note");

  if (!recipeSelect || !halalNote) return;

  // default state: hidden
  halalNote.style.display = "none";

  recipeSelect.addEventListener("change", () => {
    const selectedOption = recipeSelect.options[recipeSelect.selectedIndex];
    const hasHalal = selectedOption.innerHTML.includes("حلال");

    // show or hide halal note
    halalNote.style.display = hasHalal ? "inline-block" : "none";
  });
});
