import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SongDetail.css';
import { getSong } from "../../store/song";
import { useParams } from "react-router-dom";

const SongDetail = () => {
	const { songId } = useParams()
	const song = useSelector(state => state.song[songId])

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSong())
	}, [dispatch])

	if (!song) {
		return null
	}

	return (
		<>
			<img src={song.imageUrl}></img>
			<h3>{song.title}</h3>
			<p>{song.body}</p>
			<div>Likes: {song.likes}</div>
			<button>Edit</button>
			<button>Delete</button>
		</>
	)
}

export default SongDetail