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
	const [errors, setErrors] = useState([])
	const userId = useSelector((state)=> state.session?.user?.id)

	const handleSubmit = (e) => {
		e.preventDefault()
		setErrors([])
		const payload = {
			userId,
			imageUrl,
			url,
			title,
			body: description,
			genre: 'EDM',
			likes: 0,
		}
		let createdSong = dispatch(createSong(payload)).catch(
			async (res) => {
				const data = await res.json()
				if (data && data.errors) {
					setErrors(data.errors)
				} 
			}
		)
		// createdSong = (async function() {
		// 	let r = await createdSong.json()
		// 	return r
		// })()
		createdSong.then(val => {
			if (val) {
				history.push(`/songs/${val.id}`)
			}
			// data = val.id
		}).catch(err => err)
		// console.log(data)
		// if (data) {
		// 	// history.push('/')
		// }
	}

	if (!userId) {
		history.push('/')
	}

	return (
		<div className="add-form">
			<h1>Add new song</h1>
			<form onSubmit={handleSubmit}>
				<ul>
          {errors.map((error, idx) => (
            <li className="error2" key={idx}>{error}</li>
          ))}
        </ul>
				<input 
					placeholder="Image URL"
					type='url'
					value={imageUrl}
					required
					onChange={(e) => setImageUrl(e.target.value)} />
				<input 
					placeholder="Song URL"
					type='url'
					value={url}
					required
					onChange={(e) => setUrl(e.target.value)} />
				<input 
					placeholder="Song Title"
					type='text'
					value={title}
					required
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