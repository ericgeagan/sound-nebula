import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addPlaylistThunk, getPlaylistThunk } from "../../store/playlist"
import './Playlists.css'

const Playlists = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const [errors, setErrors] = useState([])
	const [name, setName] = useState('')
	const userId = useSelector((state)=> state.session?.user?.id)
	const playlists = Object.values(useSelector(state => state.playlists))

	useEffect(() => {
		dispatch(getPlaylistThunk())
	}, [dispatch])

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
			let newPlaylist = dispatch(addPlaylistThunk(payload)).catch(
				async (res) => {
					const data = await res.json()
					if (data && data.errors) setErrors(data.errors)
				}
			)
			setName('')
		}
	}

	return (
		<div id='detail-container'>
			<h1 id='header'>Playlists</h1>
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
				<button type='submit'>Add</button>
				<div id='playlist-container'>
					{playlists?.map(playlist => (
						<div id='playlist-item' key={playlist.id}>{playlist.name}</div>
					))}
				</div>
			</form>
		</div>
	)
}

export default Playlists