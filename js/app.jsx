import request from 'request'; // request library
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener("DOMContentLoaded", function(){

    class Song extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                image: this.props.song.track.album.images[1].url,
                title: this.props.song.track.name,
                artists: [],
                sound: new Audio(this.props.song.track.preview_url)
            }
        }
        play = () => {
            if(this.props.song.track.preview_url){
                if(this.state.sound.paused){
                    this.state.sound.play();
                } else {
                    this.state.sound.pause();
                }
            } else {
            console.log(this.props.song.track)
            }
        }
        getArtists = () => {
            let artist = this.props.song.track.artists.map((element) => {
                return <p>{element.name} </p>
            })
            this.setState({
                artists: artist
            })
        }
        componentDidMount(){
            this.getArtists();
        }
        render(){
            return <div className="flex-item"><img onClick={this.play} src={this.state.image} className="play greyHover"/><div>{this.state.artists}{this.state.title}</div></div>
        }
    }
    
 class AllSongs extends React.Component{
        constructor(props){
            super(props);
            this.state = {
            
            }
        }
        render(){
            let songs = this.props.info.items.map((element) => {
                return <Song song={element}/>
            })  
            return <div>{songs}</div>
        }
    }


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
                 return <div id="container"><AllSongs info={this.state.data}/></div>
                } else {
                    return <div>Loading data...</div>
                }
            }
        }

    
       
    //obj.items array of top songs where obj.items[0] is first song
    //obj.items[0].track.album.images[1].url url of array of images [1] 300x300 of song
    //obj.items[0].track.artists array of artist in song
    //obj.items[0].track.artists[0].name name of first artist in song
    //obj.items[0].track.name name of track
    //obj.items[0].track.id id of track to next fetch
    //obj.items[0].track.preview_url url to audio.play();
    // https://api.spotify.com/v1/tracks/{id of track}

    // fetch("https://api.spotify.com/v1/tracks/5CtI0qwDJkDQGwXD1H1cLb")
    // .then(response => response.json())
    // .then(obj => console.log(obj))

    ReactDOM.render(
        <App />,
        document.getElementById("app")
    );

})