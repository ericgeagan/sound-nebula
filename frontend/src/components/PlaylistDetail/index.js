import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getPlaylistThunk } from "../../store/playlist";
import { getPlaylistSongsThunk, removePlaylistSongThunk } from "../../store/playlistSong";
import { getSong } from "../../store/song";
import SongCard from "../SongCard";
import './PlaylistDetail.css'

const PlaylistDetail = () => {
	const { playlistId } = useParams()
	const dispatch = useDispatch()
	const history = useHistory()
	const songs = useSelector(state => state.song)
	const playlistSongs = useSelector(state => state.playlistSongs)
	const sessionUser = useSelector(state => state.session.user);

	if (!sessionUser) {
		history.push('/')
	}

	// useEffect(() => {
	// 	dispatch(getPlaylistThunk())
	// 	dispatch(getPlaylistSongsThunk())
	// }, [dispatch])
	
	const handleRemoveFromPlaylist = async (songId) => {
		await dispatch(removePlaylistSongThunk(playlistId, songId))
	}

	if (playlistSongs[playlistId] && Object.keys(playlistSongs[playlistId]).length) {
		return (
			<div className="card-grid">
				{Object.keys(playlistSongs[playlistId]).map(songId => 
					<div id='playlist-song-container' key={songId}>
						<SongCard song={songs[songId]} />
						<i id='x' className="fa-regular fa-circle-xmark" onClick={e => handleRemoveFromPlaylist(songId)}></i>
					</div>
				)}
			</div>
		)
	} else {
		return (
			<div>
				<div id='no-playlist-songs'>No Songs Yet!</div>
				<Link id='back-home' exact='true' to="/">Home</Link>
			</div>
		)
	}
}

export default PlaylistDetail