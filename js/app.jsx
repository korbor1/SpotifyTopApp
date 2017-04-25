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
            if(this.state.sound.paused){
                this.state.sound.play();
            } else {
                this.state.sound.pause();
            }
        }
        getArtists = () => {
            let artist = this.props.song.track.artists.map((element) => {
                return <div>{element.name}</div>
            })
            this.setState({
                artists: artist
            })
        }
        componentDidMount(){
            this.getArtists();
        }
        render(){
            return <div onClick={this.play}><img src={this.state.image} />{this.state.artists}{this.state.title}</div>
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
                completed: false
            }
        }
        loadData = () => {
            fetch("https://api.spotify.com/v1/users/spotify/playlists/4hOKQuZbraPDIfaGbM3lKI/tracks",{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer BQAKfHeKz1J5kXJTmVM_6hJCaUhExkJmmJs52XBSaZBrS461Cw3JygDaCsZxP90-ch3awv-3cElO1Sfud8kZlB6hjrAqrZrL8UMrJsaMMiaYFDs-hGRZwE7eR8bI7Srt9w7zLWAsP86TxzUXxOwEK2Sl4NFgUJ6ctLUHZtHNfX5NrgqcvTDQhr78Z4i0BHLVX_-09lUH474EIFDCTFYSqwu3AUPv9Q-Hm5wmbyYpbku-ssulMeI"
                }
            })
            .then(response => response.json())
            .then(resp => this.setState({data: resp, completed: true}))
        }
        componentWillMount(){
            this.loadData();
        }
        
        render(){
                if(this.state.completed){
                 return <div><AllSongs info={this.state.data}/></div>
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