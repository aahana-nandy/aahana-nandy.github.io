document.addEventListener("DOMContentLoaded", function() {
    
    // hamburger menu logic ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Dark/light mode toggle
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // check if user previously selected light mode
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        if(themeToggleBtn) themeToggleBtn.textContent = "Dark Mode";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            
            // Update button text and save preference
            if (body.classList.contains("light-mode")) {
                themeToggleBtn.textContent = "Dark Mode";
                localStorage.setItem("theme", "light");
            } else {
                themeToggleBtn.textContent = "Light Mode";
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        window.onscroll = function() {
            // Show button if scrolled down 200px
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        scrollToTopBtn.addEventListener("click", function() {
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});