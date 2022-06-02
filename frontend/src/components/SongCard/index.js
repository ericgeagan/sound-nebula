import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SongCard.css';

const SongCard = ({ song }) => {
	return (
		<>
			<img src={song.imageUrl} ></img>
		</>
	)
}

export default SongCard