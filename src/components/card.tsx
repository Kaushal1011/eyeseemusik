import React from 'react';
import styled from 'styled-components';
import playbutton from '../images/play.png'
export interface track {
    track:{title: string,
        src: string,
        album_art: string,
        artist: string},
    play:{(n:string):void},
    index:number
}


const SongTitle = styled.h1`
@import url('https://fonts.googleapis.com/css?family=Bangers&display=swap');
position:relative;
top:25px;
margin:0;
padding-top:1em;
font-family: 'Bangers', cursive;
font-style: normal;
font-size:3.5em;
font-weight: 500;
text-align: center;
color: #2A3C5F;
`

const ArtistName = styled.h2`
position:relative;
top:10px;
margin-top:5px;
padding:0;
font-family: 'Bangers', cursive;
font-weight:200;

font-style: normal;
text-align: center;
color: #979C74;
`
const LabelContainer  = styled.div`

`
const CardContainer = styled.div`
position:relative;
top:20%;
width: 400px;
height: 400px;
background: #FFFEFE;
border-radius: 25px;
padding-right:200px;
`
const ImageContainer = styled.div`
background: ${(props:{imageurl:string})=>'url('+props.imageurl+')'} #C4C4C4;
background-size:cover;
width: 300px;
height: 300px;
transform:rotate(-0.03turn);
opacity:0.7;
`

const PlayButton = styled.div`
position:absolute;
top:2em;
margin:1em;
height:270px;
width:270px;
border-radius:0;
border-style:solid;
border-width:5px;
border-color:#d0de50;
transform:rotate(0.02turn);
transition: all .3s ease-in-out;
:hover{
border-radius:50%;
transform:scale(2);
transform:traslate(20px,0);
//transition:  .3s ease-in-out;
background:url(${playbutton});
background-size:20%;
background-repeat:no-repeat;
background-position: 55% 50%;
}
`

export default class Card extends React.Component<track>{
    
    render(){
        return(
            <CardContainer>
            <ImageContainer imageurl={this.props.track.album_art}/>
            <PlayButton onClick  = {()=>{this.props.play(this.props.track.src)}} />
            <LabelContainer>
                <SongTitle>{this.props.track.title}</SongTitle>
                <ArtistName>{this.props.track.artist}</ArtistName>
            </LabelContainer>
            
            </CardContainer>
        )
    }
}