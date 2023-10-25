// client.js
window.addEventListener('load', async () => {
  try {
    const response = await fetch('/api/reviews'); // Update the route accordingly
    const data = await response.json();
    const reviewsContainer = document.getElementById('reviews-container');

    data.reviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review';

      const author = document.createElement('h3');
      author.textContent = review.author_name;

      const rating = document.createElement('h6');
      rating.textContent = review.rating;

      const text = document.createElement('p');
      text.textContent = review.text;

      reviewElement.appendChild(author);
      reviewElement.appendChild(rating);
      reviewElement.appendChild(text);

      reviewsContainer.appendChild(reviewElement);
    });
  } catch (error) {
    console.error(error);
  }
});
