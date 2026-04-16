let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    
    // Loop back to the start if at the end
    if (n > slides.length) {slideIndex = 1}
    // Loop to the end if at the start
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Display the current slide
    slides[slideIndex-1].style.display = "block";
}

// Optional: Auto-play functionality (switches every 5 seconds)
setInterval(() => {
    plusSlides(1);
}, 5000);
