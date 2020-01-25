import React from 'react';
import styled from 'styled-components'
import Card from './card'

import animation from '../function/animation'

const CardlistContainer = styled.div`
z-index:2000;
height:100vh;
display:flex;
overflow-x:auto;
:first-child{
    padding-left:20em;
}
:last-child{
    padding-right:40em;
    margin-right:20em;
}
`
export interface track {
    title: string,
    src: string,
    album_art: string,
    artist: string
}

interface CLprops{
    tracks: Array<track>
}
interface CLState{
    playing:boolean,
    currenttrack:string
}
class Cardlist extends React.Component<CLprops,CLState>{
    state:CLState;
    // add uint8array here as state of fft
    constructor(props:any){
        super(props);
        this.state = {
            playing:false,
            currenttrack:''
        }
        this.play.bind(this);
    }
    play (src:string){
        this.setState({currenttrack:src,playing:true});
    }
    componentDidMount(){
        //initial animation
        animation();
    }
    componentDidUpdate(){
        if(this.state.playing){
            let player:HTMLAudioElement = document.getElementById('player') as HTMLAudioElement;
            player.load();
            player.play();
            // add webaudio api code
            animation();
            // add fft array as paramter for animation
            // animation(this.state.fft)            
        }
        else if(!this.state.playing){
            // for when component updates on pause
            // let player:HTMLAudioElement = document.getElementById('player') as HTMLAudioElement;
            // player.load();
            // player.play();
            // add webaudio api code
            animation();
            // add fft array as paramter for animation
            // animation(this.state.fft)            
        }
    }
    render(){
        return (
            <>
            <CardlistContainer id="cardlist">
                {
                   this.props.tracks.map( (track:track,index) => {
                        return(
                            <Card key={index} track={track} play={this.play.bind(this)} index={index}/>
                        )
                    })
                }
            </CardlistContainer>
            <audio id="player"src={this.state.currenttrack}></audio>
            </>
        )
    }
}

export default Cardlist;