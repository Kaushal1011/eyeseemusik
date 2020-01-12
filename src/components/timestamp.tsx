import React from 'react'

export interface TSProps {
    player: HTMLAudioElement | undefined
}
class TimeStamp extends React.Component<TSProps> {
    render() {
        return (
            <>
                CurrentTime : {this.props.player?.currentTime}
                Duration : {this.props.player?.duration}
            </>
        )
    }
}
export default TimeStamp;