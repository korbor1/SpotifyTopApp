// var request = require('request'); // request library

// var client_id = '44e66cf6b19a449a92b68b9290cb149e';
// var client_secret = '957922058b0a41babb60a43333f2fee9';
// var newKey = new Buffer(client_id + ':' + client_secret).toString('base64');


// var authOptions = {
//   url: 'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token', // cors anywhere to avoid Cross-origin error
//   headers: {
//     'Authorization': 'Basic ' + newKey
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//     console.log(token)
//   }
// });


