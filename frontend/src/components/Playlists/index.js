import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import './Playlists.css'

const Playlists = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const [errors, setErrors] = useState([])
	const [name, setName] = useState('')
	const userId = useSelector((state)=> state.session?.user?.id)

	const handleSubmit = e => {
		e.preventDefault()
		setErrors([])
		if (!userId) {
			history.push(`/signup`)
		} else {
			e.preventDefault()
			const payload = {
				name,
				userId
			}
			let newPlaylist = dispatch()
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<ul>
          {errors.map((error, idx) => (
            <li className="error2" key={idx}>{error}</li>
          ))}
        </ul>
				<input 
					placeholder="name"
					type='text'
					value={name}
					required={true}
					onChange={e => setName(e.target.value)} />
				<button type='submit'>Add Playlist</button>
			</form>
		</div>
	)
}

export default Playlists