import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Upload.css';
import { createSong } from "../../store/song";
import { useHistory } from "react-router-dom";

const Upload = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [imageUrl, setImageUrl] = useState('')
	const [url, setUrl] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const userId = useSelector((state)=> state.session?.user?.id)

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
		let createdSong = await dispatch(createSong(payload))
		if (createdSong) {
			history.push(`/songs/${createdSong.id}`)
			// history.push('/')
		}
	}

	if (!userId) {
		history.push('/')
	}

	return (
		<div className="add-form">
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
		</div>
	)
}

export default Upload