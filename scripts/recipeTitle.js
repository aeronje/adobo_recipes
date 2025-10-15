// scripts/recipeTitle.js
document.addEventListener("DOMContentLoaded", async () => {
  // Find the <small><strong>Recipe name</strong></small> element
  const titleEl = document.querySelector("#recipeTitle");
  if (!titleEl) return; // no title area found

  // Get the ?recipe= parameter from URL
  const params = new URLSearchParams(window.location.search);
  const recipeFile = params.get("recipe");

  if (!recipeFile) {
    titleEl.textContent = "No recipe selected";
    return;
  }
  try {
    // Fetch the markdown file directly (only to get the first line)
    const resp = await fetch(`recipes/${recipeFile}`);
    if (!resp.ok) throw new Error(`Failed to load ${recipeFile} (${resp.status})`);
    const text = await resp.text();

    // Extract the first non-empty line
    const firstLine = text.split(/\r?\n/).find(line => line.trim() !== "");
    if (firstLine) {
      // Remove markdown heading symbols like "# "
      const cleanTitle = firstLine.replace(/^#+\s*/, "").trim();
      titleEl.textContent = cleanTitle;
    } else {
      titleEl.textContent = "Untitled Recipe";
    }
  } catch (err) {
    console.error("Error fetching recipe title:", err);
    titleEl.textContent = "Error loading recipe title";
  }
});
