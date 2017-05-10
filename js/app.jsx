//libraries
import request from 'request';
import React from 'react';
import ReactDOM from 'react-dom';

//modules
import HeaderBar from './modules/HeaderBar.jsx';
import FooterBar from './modules/FooterBar.jsx';
import AllSongs from './modules/AllSongs.jsx';
import Load from './modules/Load.jsx';


document.addEventListener("DOMContentLoaded", function(){

    class App extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                data: "",
                completed: false,
                token: ""
            }
        }
        loadData = () => {
            fetch("https://api.spotify.com/v1/users/spotify/playlists/4hOKQuZbraPDIfaGbM3lKI/tracks",{
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.state.token
                    }
                })
                .then(response => response.json())
                .then(resp => this.setState({data: resp, completed: true}))
        }
         loadToken = () => {
                var self = this;
                var client_id = '44e66cf6b19a449a92b68b9290cb149e';
                var client_secret = '957922058b0a41babb60a43333f2fee9';
                var newKey = new Buffer(client_id + ':' + client_secret).toString('base64');

                var auth = {
                url: 'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token', // cors anywhere to avoid Cross-origin error
                headers: {
                    'Authorization': 'Basic ' + newKey
                },
                form: {
                    grant_type: 'client_credentials'
                },
                json: true
                };

                request.post(auth, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    self.setState({
                        token: body.access_token
                    }, () => {
                        self.loadData();
                    });
                }
                });
        }
        componentDidMount(){
                this.loadToken();
        }
        
        render(){
                if(this.state.completed){
                 return <div><HeaderBar/><div id="container"><AllSongs info={this.state.data}/></div><FooterBar /></div>
                } else {
                    return <div id="container-preload"><HeaderBar/><Load /><FooterBar /></div>
                }
            }
        }

    ReactDOM.render(
        <App />,
        document.getElementById("app")
    );

})