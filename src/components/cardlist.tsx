import React from 'react';
import styled from 'styled-components'
import Card from './card'
const CardlistContainer = styled.div`
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
    constructor(props:any){
        super(props);
        this.state = {
            playing:false,
            currenttrack:''
        }
        this.scrollhandler.bind(this);
        this.play.bind(this);
    }
    play (src:string){
        this.setState({currenttrack:src,playing:true});
    }
    componentDidMount(){
        let cl = document.getElementById('cardlist') as HTMLDivElement;
        cl.addEventListener('wheel',this.scrollhandler);
    }
    componentDidUpdate(){
        if(this.state.playing){
            let player:HTMLAudioElement = document.getElementById('player') as HTMLAudioElement;
            player.load();
            player.play();
            
        }
    }
    scrollhandler(e:WheelEvent){

        let cl = document.getElementById('cardlist') as HTMLDivElement;
        //console.log(e.deltaY);
        if(e.deltaY > 0){
            cl.scrollLeft += 100;
        }else{
            cl.scrollLeft -= 100;
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