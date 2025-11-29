const api = "https://motivational-spark-api.vercel.app/api/quotes";
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const quoteSkeleton = document.getElementById("quoteSkeleton");
const authorSkeleton = document.getElementById("authorSkeleton");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const body = document.body;

// Initialize dark mode from localStorage
function initDarkMode() {
  const savedTheme = localStorage.getItem("theme-preference");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
}

// Toggle dark mode
themeToggle.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  if (isDark) {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
    localStorage.setItem("theme-preference", "dark");
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
    localStorage.setItem("theme-preference", "light");
  }
});

function showSkeleton() {
  quote.classList.add("hidden");
  author.classList.add("hidden");
  quoteSkeleton.style.display = "block";
  authorSkeleton.style.display = "block";
}

function hideSkeleton() {
  quoteSkeleton.style.display = "none";
  authorSkeleton.style.display = "none";
  quote.classList.remove("hidden");
  author.classList.remove("hidden");
  newQuoteBtn.classList.remove("loading");
}

function getQuote() {
  showSkeleton();

  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const random = Math.floor(Math.random() * data.length);
      setTimeout(function () {
        quote.innerHTML = data[random].quote;
        author.innerHTML = data[random].author;
        hideSkeleton();
      }, 100);
    })
    .catch(function (error) {
      console.error("Error fetching quote:", error);
      setTimeout(function () {
        quote.innerHTML = "An error occurred while fetching the quote.";
        author.innerHTML = "";
        hideSkeleton();
      }, 100);
    });
}

newQuoteBtn.addEventListener("click", getQuote);


initDarkMode();
getQuote();
