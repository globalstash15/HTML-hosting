import fetch from 'node-fetch-commonjs'
import express from 'express'
const app = express();

const apiKey = 'AIzaSyCi2EKAHgUtE1eO5awzizP5lAAkwhNA370';
const placeId = 'ChIJyVHDdeaGqkARPAi7oXI7JkQ';

app.get('/', async (req, res) => {
  async function fetchAndDisplayReviews () {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Check if 'data.result' exists before accessing 'reviews'
      if (data.result) {
        let html = '<html><body>'
        const reviews = data.result.reviews;

      // index.js
      // ... Your existing code ...
      
      for (const review of reviews) {
        let reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
      
        let author = document.createElement('h3');
        author.classList.add('review-author');
        author.textContent = review.author_name;
      
        let rating = document.createElement('h6');
        rating.classList.add('review-rating');
        rating.textContent = review.rating;
      
        let text = document.createElement('p');
        text.classList.add('review-text');
        text.textContent = review.text;
      
        // Append elements to the reviewDiv
        reviewDiv.appendChild(author);
        reviewDiv.appendChild(rating);
        reviewDiv.appendChild(text);
      
        // Append the reviewDiv to the reviews-container
        document.getElementById('reviews-container').appendChild(reviewDiv);
      }

          html += author
          html += rating
          html += text
        }

        html += '</body></html>'

        res
            .status(200)
            .send(html)
            .end();
      } else {
        res
            .status(200)
            .send('No reviews found.')
            .end();
      }
    } catch (error) {
      console.error(error);
    }
  }

// Call the function to fetch and display reviews
  await fetchAndDisplayReviews();

});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
