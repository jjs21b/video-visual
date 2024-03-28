const apiKey = '57155f6ce0c64cb2bd96909d78c76f58';

function fetchGames() {
  const url = `https://api.rawg.io/api/games?key=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Here you can handle the data - for now, we'll just log it
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
}

// Call the function to fetch data when the script loads
fetchGames();
