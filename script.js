// select our elements
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const newQuote = document.querySelector(".new-quote");
const twitterButton = document.querySelector(".twitter-button");
const loader = document.querySelector(".loader");
const quoteContainer = document.querySelector(".quote-container");
const bar = document.querySelector(".bar");

let quotes;

//loader function to show the user that his page is gonna be loaded any moment
function laoderFunction() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// complete function to hide the loader and display the data
function completeFunction() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
// build async function to send a request and display the data ;
const fun = async () => {
  // we want to show the loader whenever the user ckick the button new quote
  laoderFunction();
  // we want to hide the error messge if there were one from the previous request
  bar.classList.add("error");

  try {
    // send a request
    const response = await fetch("https://type.fit/api/quotes");
    // convert data to json format
    const data = await response.json();
    // data is a huge array but we only want one quote so we will choose random quote to display it
    const num = Math.floor(Math.random() * 1000);
    // we store our quote to localstorage
    // after doing that we should transform data from json to string;
    localStorage.setItem("quotes", `${JSON.stringify(data[num])}`);
    // retrun data from loacalstorge & transform data from string to object
    quotes = JSON.parse(localStorage.getItem("quotes"));
    // we are not sure if the quote has its cauthor or not so we have to check
    // if hasn't we will put in the author 'Unknown;
    author.textContent = quotes.author === null ? "Unknown" : quotes.author;
    // display the quote
    quote.textContent = quotes.text;
    // if the quote has more than 120 character we want to decrease the font size of the quote
    if (quotes.text.length > 100) {
      quote.classList.add("long-quote");
    } else {
      quote.classList.remove("long-quote");
    }
    // hide loader and display the quote
    completeFunction();
  } catch (error) {
    // if there is an error we will hide loader and display error message
    loader.hidden = true;
    bar.classList.remove("error");
  }
};
// if the user want to tweet te quote
function tweet() {
  // tweet
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quotes.text}\ author:${quotes.author}`;
  // open another page
  window.open(tweetUrl, "_blank");
}
// if the user refrech the page we don't want him/her to lose the quote
function refrech() {
  // localStorage.setItem("quotes", `${JSON.stringify(_data)}`);
  // in the first time we don't anything in our localstorage so it will be an error
  // to getItem so quotes=null
  // what will do if quote ===null we will call fun to get a quote;
  quotes = JSON.parse(localStorage.getItem("quotes"));

  if (!quotes) {
    // this will call here just for one time
    fun();
    return;
  }
  author.textContent = quotes.author === null ? "Unknown" : quotes.author;
  quote.textContent = quotes.text;
  console.log(quotes.text.length);
  if (quotes.length > 100) {
    quote.classList.add("long-quote");
  }
  completeFunction();
}

refrech();
// fun();
twitterButton.addEventListener("click", tweet);
newQuote.addEventListener("click", fun);
