import request from 'request'; // request library
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener("DOMContentLoaded", function(){

    class Song extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                image: this.props.song.track.album.images[1].url,
                title: this.props.song.track.name.slice(0,20),
                fullSong: this.props.song.track.external_urls.spotify,
                artists: [],
                sound: new Audio(this.props.song.track.preview_url),
                showHide: true,
                buttons: false
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
            let artist = this.props.song.track.artists.map((element, index) => {
                return <p key={index}>{element.name.slice(0,20)} </p>
            })
            this.setState({
                artists: artist
            })
        }
        showHide = () => {
            const currentState = this.state.showHide;
            this.setState({
                showHide: !currentState
            })
        }
        onClickHandler = () => {
            this.play();
            this.showHide();
        }
        showButtons = () => {
            const currentButtons = this.state.buttons;
            this.setState({
                buttons: !currentButtons
            })
        }
        hideButtons = () => {
            const currentButtons = this.state.buttons;
            this.setState({
                buttons: !currentButtons
            })
        }
        componentDidMount(){
            this.getArtists();
        }
        render(){
            let togglePlay = this.state.showHide ? "show" : "hide";
            let togglePause = !this.state.showHide ? "show" : "hide";
            let playClasses = `${togglePlay} fa fa-play fa-5x`;
            let pauseClasses = `${togglePause} fa fa-pause fa-5x`;
            let buttons = this.state.buttons ? "show" : "hide";
            let buttonsClasses = `${buttons} buttons`
            return <div className="flex-item">
                <div onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons} className="img-container">
                     <img src={this.state.image} />
                     <div className="greyHover">
                        <div className={buttonsClasses}>
                            <i onClick={this.onClickHandler} className={playClasses} aria-hidden="true"></i>
                            <i onClick={this.onClickHandler} className={pauseClasses} aria-hidden="true"></i>
                        </div>
                    </div>
                    </div>
                <div className="infos">
                    <p>{this.props.place}</p>
                    <span>{this.state.artists}</span>
                    {this.state.title}
                    <p><a href={this.state.fullSong}>Listen FULL song here</a></p>
                </div>
            </div>
        }
    }
    
 class AllSongs extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            let songs = this.props.info.items.map((element, index) => {
                 return <Song place={index+1} song={element} key={index}/>
            })  
            return <div>{songs}</div>
        }
    }

    class Load extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <div id="container-preload">
                        <img src="./images/4.gif"/>
                    </div>
        }
    }

    class HeaderBar extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <header>
                    <div id="about">ABOUT</div>
                    <img src="./images/spotify_logo.jpg"/>
                    </header>
        }
    }

    class FooterBar extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <footer>
                    <span>SpotifyTOPapp made by <a href="mailto:kordian.boruta@gmail.com">KB</a></span>
                    <span>For more projects check out my <a target="_blank" href="http://github.com/korbor1">Github</a></span>
                    <img id="spotify-logo" src="./images/spotify_logo_green.jpg" />
                    <a target="_blank" href="https://github.com/korbor1/SpotifyTopApp"><img id="github-logo" src="./images/GitHub-Mark-Light-32px.png" /></a>
                    </footer>
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
                 return <div><HeaderBar/><div id="container"><AllSongs info={this.state.data}/></div><FooterBar /></div>
                } else {
                    return <div><HeaderBar/><Load /><FooterBar /></div>
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