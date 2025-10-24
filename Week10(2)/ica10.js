let currentQuoteData = {
    quote: "",
    author: "",
}
document.getElementById('new-quote').addEventListener('click', getNewQuote); 

function showLoadingSpinner() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('quote-container').style.display = 'none';
}

function hideLoadingSpinner() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('quote-container').style.display = 'block';
}

const endpoint = "https://thequoteshub.com/api/quote"; 

async function getNewQuote() { 
    showLoadingSpinner();

    try {
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        const json = await response.json();
        
        currentQuoteData.quote = json.text;
        currentQuoteData.author = json.author;
        
        displayQuote();
        
    } 
    catch (err) {
        console.log(err);
    
        document.getElementById('quote').textContent = 'Failed to get new quote';
        document.getElementById('author').textContent = 'API Error';
    } finally {
        hideLoadingSpinner();
    }
}

function displayQuote(){ 
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');

    quoteText.textContent = currentQuoteData.quote;
    authorText.textContent = currentQuoteData.author;
}

getNewQuote();