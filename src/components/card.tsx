import React from 'react'
import styled from 'styled-components'
import playbutton from '../images/play-button.png';

export interface track {
    track:{title: string,
        src: string,
        album_art: string,
        artist: string},
    play:{(n:string):void},
    index:number
}


const SongTitle = styled.h2`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
position:relative;
top:10px;
margin:0;
padding-top:1em;
font-family: Roboto;
font-style: normal;
font-weight: 500;
text-align: center;
color: #2A3C5F;
`

const ArtistName = styled.h4`
position:relative;
top:10px;
margin-top:5px;
padding:0;
font-family: Roboto;
font-weight:200;
font-style: normal;
text-align: center;
color: #979C74;
`
const LabelContainer  = styled.div`
border-color:orange;
border-style:solid;
border-radius:0px 0px 25px 25px;
`
const CardContainer = styled.div`
width: 250px;
height: 370px;
background: #FFFEFE;
border-radius: 25px;
margin-right:200px;


`
const ImageContainer = styled.div`
background: ${(props:{imageurl:string})=>'url('+props.imageurl+')'} #C4C4C4;
background-size:cover;
width: 250px;
height: 250px;
border-radius: 25px 25px 0px 0px;
`

const PlayButton = styled.div`
cursor:pointer;
position:relative;
top:220px;
left:15px;
background: ${(props:{imageurl:string})=>'url('+props.imageurl+')'};
background-size:contain;
height:60px;
width:60px;
border-radius: 50%;
`

export default class Card extends React.Component<track>{
    
    render(){
        return(
            <CardContainer>
            
                <ImageContainer imageurl={this.props.track.album_art}>
                    <PlayButton imageurl={playbutton} onClick  = {()=>{this.props.play(this.props.track.src)}}></PlayButton>
                </ImageContainer>
            
            <LabelContainer>
                <SongTitle>{this.props.track.title}</SongTitle>
                <ArtistName>{this.props.track.artist}</ArtistName>
            </LabelContainer>
            
            </CardContainer>
        )
    }
}