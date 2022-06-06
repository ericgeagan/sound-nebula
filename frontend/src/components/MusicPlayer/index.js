import ReactPlayer from 'react-player'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setSongPause, setSongPlaying } from "../../store/player";

const MusicPlayer = () => {
	const playing = useSelector(state => state.player?.playing)
	const currentSongId = useSelector(state => state.player?.song)
	const song = useSelector(state => state.song[currentSongId])

	return (
		<div className='player-container'>
			<ReactPlayer 
				playing={playing}
				url={song?.url}
				controls={false}
				width={0}
				height={0}
			/>
		</div>
	)
}

export default MusicPlayer