const recipeFiles = [
  "adobo-sa-gata.md",
  "humba-ng-samar.md",
  "humba-ng-leyte.md",
  "humba-ng-hague.md",
  "adobong-bicolnon.md",
  "adobong-mexicano-jalapeno.md",
  "adobo-sa-balat-ng-lechon.md",
  "adobong-itim-classic.md",
  "adobo-pagpag.md",
  "adobo-sa-baha.md",
  "adobo-ng-tadhana.md"
];

const container = document.getElementById("recipes");

async function loadRecipes() {
  for (const file of recipeFiles) {
    const filePath = `./assets/${file}`;
    console.log(`Fetching: ${filePath}`);

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        console.warn(` Failed to fetch ${filePath}: ${response.status}`);
        continue;
      }

      const text = await response.text();
      const recipe = document.createElement("section");
      recipe.classList.add("recipe");

      const title = file.replace(".md", "").replace(/-/g, " ").toUpperCase();
      recipe.innerHTML = `
        <h2>${title}</h2>
        <pre>${text}</pre>
      `;

      container.appendChild(recipe);
    } catch (error) {
      console.error(` Error loading ${filePath}:`, error);
    }
  }
}

loadRecipes();
