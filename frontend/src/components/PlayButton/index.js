import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setSongPause, setSongPlaying } from "../../store/player";
import './PlayButton.css'

const PlayButton = ({ songId }) => {
	const dispatch = useDispatch()
	const playing = useSelector(state => state.player?.playing)
	const currentSongId = useSelector(state => state.player?.song)
	const sameCurrentSong = currentSongId === songId
	const [pause, setPause] = useState(!!playing)

	const playSong = (e) => {
		e.preventDefault()
		if (playing && sameCurrentSong) {
			// setPause(false)
			return dispatch(setSongPause())
		} else if (!playing && sameCurrentSong) {
			// setPause(true)
			return dispatch(setSongPlaying())
		}
		// setPause(true)
		return dispatch(setCurrentSong(songId))
	}

	useEffect(() => {
		if (playing && sameCurrentSong) {
			setPause(true)
		} else if (!playing && sameCurrentSong) {
			setPause(false)
		} else if (playing && !sameCurrentSong && pause) {
			setPause(false)
		}
	}, [playing, currentSongId])

	return (
		<div onClick={playSong} >
			{pause ? <i class="fa-solid fa-circle-pause"></i> : <i class="fa-solid fa-circle-play"></i>}
			{/* <img src='../icons/pause.png' className='play icon' /> */}
		</div>
	)
}

export default PlayButton