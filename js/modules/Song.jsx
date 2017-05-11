import React from 'react';
import ReactDOM from 'react-dom';

export default class Song extends React.Component{
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
            let playClasses = `${togglePlay} fa fa-play fa-3x`;
            let pauseClasses = `${togglePause} fa fa-pause fa-3x`;
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
                    {!this.props.song.track.preview_url && <p className="notAvailable">Preview not available!</p>}
                    <span>{this.state.artists}</span>
                    {this.state.title}
                    <p><a href={this.state.fullSong}>Listen FULL song here</a></p>
                </div>
            </div>
        }
    }