const api = "https://motivational-spark-api.vercel.app/api/quotes";

const quote = document.getElementById("quote");
const author = document.getElementById("author");

const quoteSkeleton = document.getElementById("quoteSkeleton");
const authorSkeleton = document.getElementById("authorSkeleton");



// Skeleton yoqish
function showSkeleton() {
    quote.classList.add("hidden");
    author.classList.add("hidden");

    quoteSkeleton.style.display = "block";
    authorSkeleton.style.display = "block";

   
}

// Skeleton o‘chirish
function hideSkeleton() {
    quoteSkeleton.style.display = "none";
    authorSkeleton.style.display = "none";

    quote.classList.remove("hidden");
    author.classList.remove("hidden");

    newQuoteBtn.classList.remove("loading");
}

async function getQuote() {
    showSkeleton();

    const response = await fetch(api);
    const data = await response.json();
    const random = Math.floor(Math.random() * data.length);

    setTimeout(() => {
        quote.innerHTML = data[random].quote;
        author.innerHTML = data[random].author;
        hideSkeleton();
    }, 100);
}

newQuoteBtn.addEventListener("click", getQuote);

// Page ochilganda bir marta yuklanadi
getQuote();
