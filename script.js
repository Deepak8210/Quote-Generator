let apiQuotes = [];

const mainQuote = document.querySelector(".main-quote");
const authorLabel = document.querySelector(".author");
const twitterBtn = document.querySelector(".btn-twitter");
const quoteBtn = document.querySelector(".btn-quote");
const loader = document.querySelector(".loader");
const quoteContainer = document.querySelector(".quote-contents");

const newQuote = function () {
  let randomNo = Math.trunc(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomNo].text;
  const author = apiQuotes[randomNo].author;
  mainQuote.textContent = `${quote}`;
  authorLabel.textContent = `- ${author || "Anonymous"}`;
};

const showLoadingBar = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingBar = function () {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// fetching quote from api
const getQuote = async function () {
  showLoadingBar();

  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    hideLoadingBar();
  } catch (error) {
    alert(
      "there is some issue with the server please try again after sometime"
    );
  }
};

// onLoad
getQuote();

quoteBtn.addEventListener("click", getQuote);

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet/?text=${mainQuote.textContent} - ${authorLabel.textContent}`;
  window.open(tweetUrl, "_blank");
}
twitterBtn.addEventListener("click", tweetQuote);
