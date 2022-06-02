import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SongList.css';

const SongList = () => {
	const songs = useSelector(state => {
		return state.song.list.map(songId => state.song[songId])
	})

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSong())
	}, [dispatch])

	if (!songs) {
		return null
	}
	return (
		<>
			{songs.map(song => {
				return (
					<></>
				)
			})}
		</>
	)
}

export default SongList