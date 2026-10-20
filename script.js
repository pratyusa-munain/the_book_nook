const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-chip");
const bookCards = [...document.querySelectorAll(".book-card")];
const visibleCount = document.getElementById("visibleCount");
const emptyState = document.getElementById("emptyState");
const readingCount = document.getElementById("readingCount");
const readingSummary = document.getElementById("readingSummary");
const showSavedButton = document.getElementById("showSavedButton");
const toast = document.getElementById("toast");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

let activeGenre = "All";
let savedOnly = false;
let toastTimeout;

function getSavedBooks() {
  try {
    return JSON.parse(localStorage.getItem("bookNookSaved") || "[]");
  } catch (error) {
    return [];
  }
}

function storeSavedBooks(saved) {
  try {
    localStorage.setItem("bookNookSaved", JSON.stringify(saved));
  } catch (error) {
    showToast("Your browser couldn't save the list for this session.");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2300);
}

function updateSavedUI() {
  const saved = getSavedBooks();
  readingCount.textContent = saved.length;
  readingSummary.textContent = saved.length
    ? `${saved.length} ${saved.length === 1 ? "book" : "books"} saved for a future reading day.`
    : "Save books you want to read later.";

  bookCards.forEach(card => {
    const title = card.dataset.title;
    const button = card.querySelector(".save-button");
    const isSaved = saved.includes(title);
    button.classList.toggle("saved", isSaved);
    button.setAttribute("aria-pressed", String(isSaved));
    button.innerHTML = isSaved ? "✓ Saved" : "＋ Save";
    button.setAttribute("aria-label", `${isSaved ? "Remove" : "Add"} ${title} ${isSaved ? "from" : "to"} reading list`);
  });
}

function filterBooks() {
  const query = searchInput.value.trim().toLowerCase();
  let count = 0;

  bookCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const author = card.dataset.author.toLowerCase();
    const genre = card.dataset.genre;
    const saved = getSavedBooks().includes(card.dataset.title);
    const matchesSearch = title.includes(query) || author.includes(query);
    const matchesGenre = activeGenre === "All" || genre === activeGenre;
    const matchesSaved = !savedOnly || saved;
    const visible = matchesSearch && matchesGenre && matchesSaved;
    card.hidden = !visible;
    if (visible) count++;
  });

  visibleCount.textContent = count;
  emptyState.hidden = count !== 0;
  showSavedButton.textContent = savedOnly ? "Show all books →" : "Show saved books →";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeGenre = button.dataset.filter;
    filterButtons.forEach(item => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    filterBooks();
  });
});

searchInput.addEventListener("input", filterBooks);

bookCards.forEach(card => {
  const button = card.querySelector(".save-button");
  button.addEventListener("click", () => {
    const title = card.dataset.title;
    const saved = getSavedBooks();
    const wasSaved = saved.includes(title);
    const updated = wasSaved ? saved.filter(item => item !== title) : [...saved, title];
    storeSavedBooks(updated);
    updateSavedUI();
    filterBooks();
    showToast(wasSaved ? `Removed “${title}” from your list.` : `Saved “${title}” for later ♡`);
  });
});

showSavedButton.addEventListener("click", () => {
  savedOnly = !savedOnly;
  if (savedOnly) {
    activeGenre = "All";
    searchInput.value = "";
    filterButtons.forEach(button => {
      const isActive = button.dataset.filter === "All";
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
  }
  filterBooks();
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

function resetCollectionView() {
    activeGenre = "All";
    savedOnly = false;
    searchInput.value = "";

    filterButtons.forEach(button => {
        const isActive = button.dataset.filter === "All";
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    filterBooks();
}

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    if (link.textContent.trim() === "Collection") {
      resetCollectionView();
    }
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
updateSavedUI();
filterBooks();
