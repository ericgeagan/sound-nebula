import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../Upload/Upload.css';
import { editSong } from "../../store/song";
import { useHistory, useParams } from "react-router-dom";

const SongDetailEdit = () => {
	const { songId } = useParams()
	const dispatch = useDispatch()
	const history = useHistory()
	const userId = useSelector((state)=> state.session.user.id)
	const song = useSelector(state => state.song[songId])
	const [imageUrl, setImageUrl] = useState(song.imageUrl || '')
	const [url, setUrl] = useState(song.url || '')
	const [title, setTitle] = useState(song.title || '')
	const [description, setDescription] = useState(song.body || '')

	const handleSubmit = async (e) => {
		e.preventDefault()
		const payload = {
			userId,
			imageUrl,
			url,
			title,
			body: description,
			genre: 'EDM',
			likes: 0,
		}
		let song = await dispatch(editSong(payload, songId))
		if (song) {
			history.push(`/songs/${songId}`)
			// history.push('/')
		}
	}

	// If incorrect user, render unauthorized
	if (song.userId !== userId) {
		return (
			<>
				<h3>Unauthorized</h3>
			</>
		)
	}

	return (
		<>
			<h1>Add new song</h1>
			<form onSubmit={handleSubmit}>
				<input 
					placeholder="Image URL"
					type='url'
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)} />
				<input 
					placeholder="Song URL"
					type='url'
					value={url}
					onChange={(e) => setUrl(e.target.value)} />
				<input 
					placeholder="Song Title"
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)} />
				<input 
					placeholder="Description"
					type='text'
					value={description}
					onChange={(e) => setDescription(e.target.value)} />
				<button type='submit'>Submit</button>
			</form>
		</>
	)
}

export default SongDetailEdit