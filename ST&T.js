const slider = [...document.querySelectorAll('.slidercontainer')];

slidercontainer.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    function moveSlide(sliderId, direction) {
        let container = document.getElementById(sliderId);
        if (!container) return; // Ensure the container exists
    
        let scrollAmount = container.offsetWidth; // Moves by full container width
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth"
        });
    }
})

// Form Submission Event
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reviewForm"); // Ensure form has correct ID
    const reviewList = document.getElementById("reviewList"); // Make sure there's a container for reviews
    const ratingInput = document.getElementById("ratingValue"); // Get rating value

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const reviewText = document.getElementById("review").value;
            const mediaFile = document.getElementById("mediaUpload").files[0];

            let rating = ratingInput.textContent.replace("Rating: ", "").trim(); // Extract rating value

            let reviewHTML = `
                <div class="review-card">
                    <h5>${name} - <span style="color: gold;">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span></h5>
                    <p>${reviewText}</p>
            `;

            if (mediaFile) {
                const mediaURL = URL.createObjectURL(mediaFile);
                if (mediaFile.type.startsWith("image/")) {
                    reviewHTML += `<img src="${mediaURL}" alt="Review Image" style="max-width: 100%; height: auto;">`;
                } else if (mediaFile.type.startsWith("video/")) {
                    reviewHTML += `<video controls style="max-width: 100%;"><source src="${mediaURL}" type="${mediaFile.type}"></video>`;
                }
            }

            reviewHTML += `</div>`;
            reviewList.innerHTML += reviewHTML;

            // Clear form fields after submission
            form.reset();
            highlightStars(0); // Reset stars
            ratingValue.textContent = "Rating: 0"; // Reset rating text
        });
    }
});

