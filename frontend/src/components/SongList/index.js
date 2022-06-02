import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSong } from "../../store/song";
import './SongList.css';
import SongCard from "../SongCard";

const SongList = () => {
	const songs = useSelector(state => {
		return state.song.list
		// return state.song.list.map(songId => state.song[songId])
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
					<SongCard key={song.id} song={song}/>
				)
			})}
		</>
	)
}

export default SongList