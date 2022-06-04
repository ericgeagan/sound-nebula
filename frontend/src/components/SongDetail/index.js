import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SongDetail.css';
import { deleteSong, getComments, getSong } from "../../store/song";
import { Link, useHistory, useParams } from "react-router-dom";
import CommentBox from "../CommentBox";
import CommentForm from "../CommentForm";

const SongDetail = () => {
	const { songId } = useParams()
	const userId = useSelector(state=> state.session?.user?.id)
	const song = useSelector(state => state.song[songId])
	const comments = useSelector(state => state.song[songId]?.comments)
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSong()) // Should change this to getOneSong
		dispatch(getComments(songId))
	}, [dispatch])

	const handleDelete = async (e) => {
		e.preventDefault()
		const payload = {
			userId,
			songId
		}
		const response = await dispatch(deleteSong(payload))
		if (response) {
			history.push(`/`)
		}
	}

	// Edit Song Page
	const handleEdit = async (e) => {
		history.push(`/songs/${songId}/edit`)
	}

	if (!song) {
		return null
	}

	return (
		<>
			<img src={song.imageUrl}></img>
			<h3>{song.title}</h3>
			<p>{song.body}</p>
			<div>Likes: {song.likes}</div>
			{userId === song.userId ? <button onClick={handleEdit}>Edit</button> : null}
			{userId === song.userId ? <button onClick={handleDelete}>Delete</button> : null}
			<CommentForm songId={songId}/>
			{comments?.map(comment => (
				<CommentBox key={comment.id} comment={comment}/>
			))}
		</>
	)
}

export default SongDetail