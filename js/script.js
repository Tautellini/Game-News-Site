$('#getGames').on("click", function (e) {

	postRequest('https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/', 'fields name; limit 10;')
  .then(data => console.log(data)) // Result from the `response.json()` call
  .catch(error => console.error(error))

function postRequest(url, data) {
  return fetch(url, {
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: data, // Coordinate the body type with 'Content-Type'
    headers: new Headers({
			'Content-Type': 'raw',
			'user-key' : '2bb2b4e94e423cf9bd1e04266b179551'
    }),
  })
  .then(response => response.text())
}

})