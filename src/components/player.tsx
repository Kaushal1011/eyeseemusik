import React from 'react'
//import TimeStamp from './timestamp';
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

function getTimeString(n: number | undefined): string {
    if (n !== undefined) {
        let min = Math.floor(n / 60);
        let sec = Math.floor(n) % 60;
        let secString = sec.toString();
        if (secString.length < 2) {
            secString = '0' + sec.toString();
        }

        return min.toString() + ':' + secString;
    }
    return ''
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
            if (this.state.currentTrack + 1 < this.props.tracks.length) {
                this.setState({ currentTrack: this.state.currentTrack + 1 })
                if (this.state.playing) {
                    player.play();
                }
            }
            else {
                player.load();
                player.pause();
                alert('Last track');
            }
        } else {
            if (-1 < this.state.currentTrack - 1) {
                this.setState({ currentTrack: this.state.currentTrack - 1 })
                if (this.state.playing) {
                    player.play();
                }
            } else {
                player.load();
                player.pause();
                alert('No Previous Track');
            }
        }

    }
    sliderValue() {
        if (this.state.player !== undefined) {
            return this.state.player?.currentTime * 100 / this.state.player?.duration
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
        this.sliderValue.bind(this);
        this.seek.bind(this);
    }
    seek(n: number) {
        if (!isNaN(n)) {
            let newplayer: HTMLAudioElement;
            if (this.state.player !== undefined) {
                newplayer = this.state.player;
                newplayer.currentTime = n * this.state.player?.duration / 100;
                this.setState({ player: newplayer })
            }
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({ player: document.getElementById('musicplayer') as HTMLAudioElement })
            if (this.state.player?.currentTime === this.state.player?.duration) {
                this.playNext_Pre(true);
            }
        }, 500)

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

                    CurrentTime : {getTimeString(this.state.player?.currentTime)}
                    Duration : {getTimeString(this.state.player?.duration)}

                    <br />
                    <input type="range" name="seek" className="slider" min={0} max={100} value={this.sliderValue()} step={0.1} onInput={(e) => { this.seek(parseFloat(e.currentTarget.value)) }} />
                </div>
            </>
        )
    }
}

export default MusicPlayer;