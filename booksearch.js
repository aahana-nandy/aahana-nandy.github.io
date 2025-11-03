let currentBookData = {
    title: "Click 'Search Book' to begin!",
    author: "Open Library Search",
}


const titleField = document.getElementById('titleInput'); 
const searchButton = document.getElementById('searchButton'); 


const endpoint = "https://openlibrary.org/search.json";

async function searchBooks() {
    let title = titleField.value; 
    
   
    document.getElementById('title').textContent = 'Searching...';
    document.getElementById('authorName').textContent = 'Fetching data...';


    let search_title = "";
    for (i = 0; i < title.length; i++) {
        if (title[i] == " ") {
            search_title = search_title + "+"
        }
        else {
            search_title = search_title + title[i];
        }
    }

   
    let curr_end = String(endpoint + "?title=" + search_title); 
    
    try {
        const response = await fetch(curr_end);
        
        
        if (!response.ok) {
            throw Error(response.statusText);
        }
        
        const json = await response.json();
        
        
        if (json.docs && json.docs.length > 0) {
            const firstDoc = json.docs[0];
            
            // getting the title and author names
            currentBookData.title = firstDoc.title || "Title Not Found";
            currentBookData.author = firstDoc.author_name; 
        } else {
             // if no results are found
             currentBookData.title = `No results found for "${title}"`;
             currentBookData.author = 'Search Failure';
        }

        displayBook();
        
    } 
    catch (err) {
        console.error("API Fetch Error:", err);
        
        // error message instead of  alert from last week
        currentBookData.title = 'Failed to fetch book data.';
        currentBookData.author = 'Network/API Error';
        displayBook();
    }
}

function displayBook(){ 
    const titleText = document.getElementById('title');
    const authorText = document.getElementById('authorName');

    titleText.textContent = currentBookData.title;
    authorText.textContent = currentBookData.author;
}

searchButton.addEventListener("click", searchBooks); 