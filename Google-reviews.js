// Replace 'YOUR_API_KEY' with your actual Google API key
const apiKey = 'AIzaSyDGYIbOkIVI6AGATXxbNmSni15YOOlupFw';

// Replace 'PLACE_ID_FIELD' with the Webflow field that holds the Place ID for each business
const urlParams = new URLSearchParams(window.location.search);
const placeId = urlParams.get('placeId');

// Create a function to fetch and display reviews
async function fetchAndDisplayReviews() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const reviews = data.result.reviews;
    const reviewsContainer = document.getElementById('reviews-container');

    for (const review of reviews) {
      const reviewElement = document.createElement('div');
      reviewElement.innerHTML = `
        <p>${review.text}</p>
        <p>Rating: ${review.rating}</p>
        <p>Author: ${review.author_name}</p>
        <hr>
      `;
      reviewsContainer.appendChild(reviewElement);
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch and display reviews
fetchAndDisplayReviews();
