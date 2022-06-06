import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlayButton from "../PlayButton";
import './SongCard.css';

const SongCard = ({ song }) => {
	return (
		<div className="card-div">
			<Link key={song.id} to={`/songs/${song.id}`}>
				<img src={song.imageUrl} className='song-card'></img>
				{/* <img src='https://www.kindpng.com/picc/b/1-18309_soundcloud-button-png.png'></img> */}
			</Link>
			<div className="title">
				<PlayButton songId={song.id} />
				<span>{song.title}</span>
			</div>
		</div>
	)
}

export default SongCard