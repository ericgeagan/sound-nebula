import ReactPlayer from 'react-player'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setSongPause, setSongPlaying } from "../../store/player";

const MusicPlayer = () => {
	const playing = useSelector(state => state.player?.playing)
	const currentSongId = useSelector(state => state.player?.song)
	const song = useSelector(state => state.song[currentSongId])

	return (
		<>
			<ReactPlayer 
				playing={playing}
				url={song?.url}
				controls={false}
			/>
		</>
	)
}

export default MusicPlayer