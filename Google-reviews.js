import fetch from 'node-fetch';

// Replace 'YOUR_API_KEY' with your actual Google API key
const apiKey = 'AIzaSyCi2EKAHgUtE1eO5awzizP5lAAkwhNA370'; // Replace with your API key

// Manually input the Place ID
const placeId = 'ChIJY8Fg6REyGQ0Rdj1N21qSITM'; // Replace with your Place ID

async function fetchAndDisplayReviews() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.result && data.result.reviews) {
      const reviews = data.result.reviews;

      for (const review of reviews) {
        console.log(review.text);
        console.log('Rating:', review.rating);
        console.log('Author:', review.author_name);
        console.log('-------------------');
      }
    } else {
      console.log('No reviews found for this Place ID.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch and display reviews
fetchAndDisplayReviews();
