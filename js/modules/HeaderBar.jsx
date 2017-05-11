import React from 'react';
import ReactDOM from 'react-dom';

export default class HeaderBar extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return <header>
                    <a href="https://github.com/korbor1/SpotifyTopApp/blob/master/README.md" target="_blank">
                    <div id="about">ABOUT</div></a>
                    <img src="./images/spotify_logo.jpg"/>
                    </header>
        }
    }