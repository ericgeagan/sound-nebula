import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './SongCard.css';

const SongCard = ({ song }) => {
	return (
		<div>
			<img src={song.imageUrl} ></img>
			<Link key={song.id} to={`/songs/${song.id}`}>{song.title}</Link>
		</div>
	)
}

export default SongCard