import React from 'react'
import TimeStamp from './timestamp';
export interface track {
    title: string,
    src: string,
    album_art: string,
    artist: string
}

interface MPProps {
    tracks: Array<track>
}

interface MPState {
    player: HTMLAudioElement | undefined,
    playing: boolean,
    currentTrack: number,
    currentTime: number
}


class MusicPlayer extends React.Component<MPProps, MPState>{

    togglePlay: () => void = () => {
        let player = this.state.player as HTMLAudioElement;
        if (!this.state.playing) {
            player.play();
            this.setState({ playing: true });
        }
        else {
            player.pause();
            this.setState({ playing: false });
        }
    }

    playNext_Pre: (isNext: boolean) => void = (isNext) => {
        let player = this.state.player as HTMLAudioElement;
        if (isNext) {
            if (this.state.currentTime + 1 < this.props.tracks.length) {
                this.setState({ currentTrack: this.state.currentTrack + 1 })
                player.load();
                if (this.state.playing) {
                    player.play();
                }
            }
        } else {
            if (-1 < this.state.currentTime - 1) {
                this.setState({ currentTrack: this.state.currentTrack - 1 })
                player.load();
                if (this.state.playing) {
                    player.play();
                }
            }
        }

    }

    constructor(props: MPProps) {
        super(props);
        this.state = {
            player: undefined,
            playing: false,
            currentTime: 0,
            currentTrack: 0
        }
        this.togglePlay.bind(this);
        this.playNext_Pre.bind(this);
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({ player: document.getElementById('musicplayer') as HTMLAudioElement })
        }, 10)
    }

    render() {
        return (
            <>
                <div>
                    Title:{this.props.tracks[this.state.currentTrack].title}
                    <audio id="musicplayer">
                        <source src={this.props.tracks[this.state.currentTrack].src} />
                    </audio>
                    <button onClick={() => { this.playNext_Pre(false) }}>Previous</button>
                    <button onClick={() => { this.togglePlay() }}>Play/Pause</button>
                    <button onClick={() => { this.playNext_Pre(true) }}>Next</button>
                    <br />

                    CurrentTime : {this.state.player?.currentTime}
                    Duration : {this.state.player?.duration}
                </div>
            </>
        )
    }
}

export default MusicPlayer;