import React from 'react';
import ReactDOM from 'react-dom';

export default class HeaderBar extends React.Component{
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