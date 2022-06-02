import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SongDetail.css';
import { getSong } from "../../store/song";
import { useParams } from "react-router-dom";

const SongDetail = () => {
	const { songId } = useParams()
	const song = useSelector(state => state.song[songId])

	// if (!song) {
	// 	return null
	// }

	return (
		<>
		</>
	)
}

export default SongDetail