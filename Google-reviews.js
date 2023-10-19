import fetch from 'node-fetch';

// Replace 'YOUR_API_KEY' with your actual Google API key
const apiKey = 'AIzaSyDGYIbOkIVI6AGATXxbNmSni15YOOlupFw';

// Replace 'PLACE_ID' with the Place ID for the business
const urlParams = new URLSearchParams(window.location.search);
const placeId = urlParams.get('placeId');

async function fetchAndDisplayReviews() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const reviews = data.result.reviews;

    for (const review of reviews) {
      console.log(review.text);
      console.log('Rating:', review.rating);
      console.log('Author:', review.author_name);
      console.log('-------------------');
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch and display reviews
fetchAndDisplayReviews();
