import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SongCard from "../SongCard";

const PlaylistDetail = () => {
	const { playlistId } = useParams()
	const songs = useSelector(state => state.song)
	const playlistSongs = Object.keys(useSelector(state => state.playlistSongs[playlistId]))

	return (
		<div className="card-grid">
			{playlistSongs.map(songId => {
				<SongCard key={songId} song={songs[songId]} />
			})}
		</div>
	)
}

export default PlaylistDetail