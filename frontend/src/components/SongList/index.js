import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSong } from "../../store/song";
import './SongList.css';
import SongCard from "../SongCard";
import { getPlaylistSongsThunk } from "../../store/playlistSong";

const SongList = () => {
	const songs = useSelector(state => {
		return state.song.list
		// return state.song.list.map(songId => state.song[songId])
	})

	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(getSong())
	// 	dispatch(getPlaylistSongsThunk())
	// }, [dispatch])

	if (!songs) {
		return null
	}
	return (
		<div className="card-grid">
			{songs.map(song => {
				return (
					<SongCard key={song.id} song={song}/>
				)
			})}
		</div>
	)
}

export default SongList