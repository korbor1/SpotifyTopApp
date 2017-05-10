import React from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Song from './Song.jsx';
import Load from './Load.jsx';

export default class AllSongs extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                itemsValue: 10,
                items: this.props.info.items.slice(0, 10)
            }
        }
        loadMore = () => {
            this.setState({
                itemsValue: this.state.itemsValue + 10,
                items: this.props.info.items.slice(0, this.state.itemsValue)          
            })
        }
        render(){
            let songs = this.state.items.map((element, index) => {
                 return <Song place={index+1} song={element} key={index}/>
            })
        
            return <div style={{height: "500px", overflow:"auto"}}><InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMore}
                        hasMore={this.state.items.length == 100 ? false : true}
                        loader={<Load />}
                        useWindow={false}>
                        {songs}
                    </InfiniteScroll></div>
        }
    }