import fetch from 'node-fetch';

// Replace 'YOUR_API_KEY' with your actual Google API key
const apiKey = 'AIzaSyDGYIbOkIVI6AGATXxbNmSni15YOOlupFw';

// Get placeId from the command line arguments in a Node.js environment
const args = process.argv.slice(2); // Remove the first two arguments (node and script filename)
const placeId = args[0]; // Assuming placeId is the first argument

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
