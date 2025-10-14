// scripts/main.js
document.addEventListener("DOMContentLoaded", () => {
  const recipeSelect = document.getElementById("recipeSelect"); // exists only on index
  const goBtn = document.getElementById("goBtn"); // exists on both pages
  const viewRecipeBtn = document.getElementById("viewRecipeBtn"); // exists on recipe.html
  const modal = document.getElementById("recipeModal"); // modal in recipe.html
  const closeBtn = modal ? modal.querySelector(".close") : null;
  const recipeContent = document.getElementById("recipeContent"); // where marked content goes

  // Helper: open new tab safely
  function openNewTab(url) {
    // Use window.open with noopener,noreferrer
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // If recipeSelect exists -> we're on index page
  if (recipeSelect) {
    // INDEX PAGE: Go button should open recipe.html with query param 'recipe'
    if (goBtn) {
      goBtn.addEventListener("click", () => {
        const selected = recipeSelect.value;
        if (!selected) {
          alert("Please choose a recipe first 🍲");
          return;
        }
        const target = `recipe.html?recipe=${encodeURIComponent(selected)}`;
        openNewTab(target);
      });
    }

    // Nothing else to do on index page
    return;
  }

  // From here: we are NOT on index page — assume recipe.html (has modal and viewRecipeBtn)
  // RECIPE PAGE: Go button -> PRs
  if (goBtn) {
    goBtn.addEventListener("click", () => {
      openNewTab("https://github.com/aeronje/adobo_recipes/pulls");
    });
  }

  // View Recipe -> open modal and render markdown
  if (viewRecipeBtn && modal && recipeContent) {
    viewRecipeBtn.addEventListener("click", async () => {
      const params = new URLSearchParams(window.location.search);
      const recipeFile = params.get("recipe"); // matches index param

      if (!recipeFile) {
        recipeContent.innerHTML = "<p><em>No recipe selected. Go back and pick one.</em></p>";
      } else {
        try {
          const resp = await fetch(`recipes/${recipeFile}`);
          if (!resp.ok) throw new Error(`Failed to load ${recipeFile} (${resp.status})`);
          const md = await resp.text();
          // Use marked (assumes marked is included on the page)
          recipeContent.innerHTML = marked.parse(md, { breaks: true });
        } catch (err) {
          console.error(err);
          recipeContent.innerHTML = `<p style="color:darkred;"><strong>Error loading recipe.</strong></p>`;
        }
      }

      // show modal
      modal.style.display = "block";
      // lock scroll behind modal
      document.body.style.overflow = "hidden";
    });

    // close actions
    if (closeBtn) closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });

    // click outside to close
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // esc to close
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (modal.style.display === "block") {
          modal.style.display = "none";
          document.body.style.overflow = "";
        }
      }
    });
  }
});
