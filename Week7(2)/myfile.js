
    document.documentElement.classList.remove('no-js'); // For the progressive enhancement requirnemnt
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const filterButtons = document.querySelectorAll('.filter-button'); //seconf feuature
    const galleryItems = document.querySelectorAll('.gallery-column');

    // these are the footer buttons for text size changes
    const small_txt = document.querySelector('#small-text');
    const med_txt = document.querySelector('#med-text'); 
    const large_txt = document.querySelector('#large-text');
    const clear_txt_pref = document.querySelector('#clear-preferences');
    
    
    // High Contrast Mode
    function toggleContrast() {
        document.body.classList.toggle('high-contrast');
    }

    // Mobile Menu Mode
    function showMenu() {
       var shown = navMenu.classList.toggle("show");
        navMenu.classList.toggle("hide");

        navToggle.setAttribute('aria-expanded', shown);

        if (shown) {
            navToggle.classList.add("menu-open");
            const firstLink = navMenu.querySelector('li a');
            firstLink.focus();
        } else {
            navToggle.classList.remove("menu-open");
            navToggle.focus();
        }
    }
     // clear local storage,a and resets text size 
    function change_text_size(size) {
        let temp_size = size * 16;

        document.querySelector('html').style.fontSize = String(temp_size) +"px";
        const item = {
            value: temp_size,
            //expiry: new Date().getTime() + 5000, // 5 seconds (testing code to see if it works)
            expiry: new Date().getTime() + (30 * 24 * 60 * 60 * 1000), // 30 days in milliseconds
        };
    // Save that object in localStorage.  rename the key 
        localStorage.setItem("fontSizePref", JSON.stringify(item));
        console.log("Font size preference saved with expiration.");

    }

    
    function set_text_size() {
         const itemStr = localStorage.getItem("fontSizePref");
        if (!itemStr) {
            return; // Exit if nothing is stored.
        }
        const item = JSON.parse(itemStr);
        const now = new Date().getTime();
        // check if the current time is past the stored expiration date.
        if (now > item.expiry) {
            // if expired, remove it from storage and do nothing.
            localStorage.removeItem("fontSizePref");
            console.log("Font size preference expired and removed.");
        } else {
            // ifnot expired, apply the font size.
            document.querySelector("html").style.fontSize = String(item.value) + "px";
        }


    }
    function clear_local_storage() {
        // remove the specific item instead of clearing everything?
        localStorage.removeItem("fontSizePref"); 
        document.querySelector('html').style.fontSize = "16px"; // reset tothe default size.
        console.log("Font size preferences cleared by user.");
    }

    // Mobile Menu listeners for progressive enhancment requirment
    navToggle.addEventListener('click', showMenu);
    navToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showMenu();
        }
        /* now menu opens and closes just with keyboard!*/
    });

    // High Contrast Mode Listener (first feauture)
    addEventListener("keydown", (event) => {
        if (event.key === "c") {
            toggleContrast();
        }
    });

    // Gallery Filter Listener (second feauture)
    // This 'if' statement is the fix. It prevents this code from running on the homepage.
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.dataset.filter;

                galleryItems.forEach(item => {
                    const itemCategory = item.dataset.category;
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('is-hidden');
                    } else {
                        item.classList.add('is-hidden');
                    }
                });
            });
        });
    
   
    }
    window.addEventListener('load',set_text_size);

    small_txt.addEventListener('click', () => {change_text_size(0.8)});
    med_txt.addEventListener('click', () => {change_text_size(1)});
    large_txt.addEventListener('click', () => {change_text_size(1.5)});
    clear_txt_pref.addEventListener('click', () => {clear_local_storage()});

    