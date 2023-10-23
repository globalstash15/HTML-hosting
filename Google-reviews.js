import fetch from 'node-fetch';

// Replace 'YOUR_API_KEY' with your actual Google API key
const apiKey = 'AIzaSyDGYIbOkIVI6AGATXxbNmSni15YOOlupFw';

// Manually specify the placeId (you can replace this with your desired Place ID)
const placeId = 'ChIJyVHDdeaGqkARPAi7oXI7JkQ';

async function fetchAndDisplayReviews() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Log the entire response data
    console.log('Response Data:', data);

    // Check if 'data.result' exists before accessing 'reviews'
    if (data.result) {
      const reviews = data.result.reviews;

      for (const review of reviews) {
        console.log(review.text);
        console.log('Rating:', review.rating);
        console.log('Author:', review.author_name);
        console.log('-------------------');
      }
    } else {
      console.log('No reviews found.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch and display reviews
fetchAndDisplayReviews();
