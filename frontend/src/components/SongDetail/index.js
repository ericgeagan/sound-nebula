import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SongDetail.css';
import { deleteSong, getComments, getSong } from "../../store/song";
import { Link, useHistory, useParams } from "react-router-dom";
import CommentBox from "../CommentBox";
import CommentForm from "../CommentForm";
import PlayButton from "../PlayButton";
import { getPlaylistThunk } from "../../store/playlist";
import { getPlaylistSongsThunk } from "../../store/playlistSong";
import PlaylistDropdown from "../PlaylistDropdown/playlistdropdown";

const SongDetail = () => {
	const { songId } = useParams()
	const userId = useSelector(state=> state.session?.user?.id)
	const song = useSelector(state => state.song[songId])
	const comments = useSelector(state => state.song[songId]?.comments)
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		// dispatch(getSong()) // Should change this to getOneSong
		dispatch(getComments(songId))
		// dispatch(getPlaylistThunk())
		// dispatch(getPlaylistSongsThunk())
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
		<div id='detail-container'>
			<img className="image-card" src={song.imageUrl}></img>
			<div className="details">
				<div className="title-button">
					<div className="button-container">
						<PlayButton songId={song.id} />
					</div>
					<h1>{song.title}</h1>
				</div>
				<div>
					<PlaylistDropdown songId={song.id} />
				</div>
				<p>{song.body}</p>
				<p>Likes: {song.likes}</p>
				<p>Genre: {song.genre}</p>
				{userId === song.userId ? <button className="button" onClick={handleEdit}>Edit</button> : null}
				{userId === song.userId ? <button className="button" onClick={handleDelete}>Delete</button> : null}
				<CommentForm songId={songId}/>
				{comments?.map(comment => (
					<CommentBox key={comment.id} comment={comment}/>
				))}
			</div>
		</div>
	)
}

export default SongDetail