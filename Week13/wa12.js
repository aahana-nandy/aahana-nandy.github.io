const titleField = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton'); 
const bookResultsContainer = document.getElementById('book-results');
const loader = document.getElementById('loader');

const endpoint = "https://openlibrary.org/search.json";


function formatQuery(query) {
    return query.trim().replace(/\s/g, '+');
}

async function searchBooks() {
    let title = titleField.value; 
    
    // this will be so they don't search if the input is empty
    if (title.trim() === "") {
        bookResultsContainer.innerHTML = '<p class="initial-message">Please enter a search term.</p>';
        return;
    }
   
    // to clear th previous results and show the loader
    bookResultsContainer.innerHTML = ''; 
    loader.style.display = 'block';

    let search_title = formatQuery(title);

    let curr_end = String(endpoint + "?q=" + search_title); 
    
    try {
        const response = await fetch(curr_end);
        
        
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        const json = await response.json();
        
        // hide the loader 
        loader.style.display = 'none';
        
        
        if (json.docs && json.docs.length > 0) {
    
            displayResults(json.docs, title);
        } else {
             // if no results are found
             bookResultsContainer.innerHTML = `<p class="initial-message">No results found for "${title}".</p>`;
        }
        
    } 
    catch (err) {
        console.error("API Fetch Error:", err);
        loader.style.display = 'none'; // Hide loader on error
        
        // Error message for the displa
        bookResultsContainer.innerHTML = `
            <p class="initial-message">
                Failed to fetch book data. Network or API error occurred.
            </p>`;
    }
}


function displayResults(books, query){ 
    let resultsHtml = '';
    
    // loop through the first 10 books instead of my 1 result before
    const maxResults = Math.min(books.length, 10); 
    
    for (let i = 0; i < maxResults; i++) {
        const book = books[i];

        const title = book.title || "Title Unknown";
        const author = book.author_name ? book.author_name.join(', ') : "Author Unknown"; 
        
        // an html structure for the single book cards 
        const cardHtml = `
            <div class="book-card">
                <h3 class="book-title">${title}</h3>
                <p class="book-author">By: ${author}</p>
            </div>
        `;
        resultsHtml += cardHtml;
    }
    bookResultsContainer.innerHTML = resultsHtml;
}

searchButton.addEventListener("click", searchBooks);

// allows searching on enter key press
titleField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBooks();
    }
});