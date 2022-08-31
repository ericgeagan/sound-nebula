import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlaylistThunk } from "../../store/playlist";
import { getPlaylistSongsThunk } from "../../store/playlistSong";
import { getSong } from "../../store/song";
import SongCard from "../SongCard";

const PlaylistDetail = () => {
	const { playlistId } = useParams()
	const dispatch = useDispatch()
	const songs = useSelector(state => state.song)
	const playlistSongs = useSelector(state => state.playlistSongs)

	// useEffect(() => {
	// 	dispatch(getPlaylistThunk())
	// 	dispatch(getPlaylistSongsThunk())
	// }, [dispatch])
	
	return (
		<div className="card-grid">
			{playlistSongs[playlistId] && Object.keys(playlistSongs[playlistId]).map(songId => 
				<SongCard key={songId} song={songs[songId]} />
			)}
		</div>
	)
}

export default PlaylistDetail