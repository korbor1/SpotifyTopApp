import React from 'react';
import ReactDOM from 'react-dom';

export default class FooterBar extends React.Component{
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