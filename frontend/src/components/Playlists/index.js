import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { addPlaylistThunk, deletePlaylistThunk, getPlaylistThunk } from "../../store/playlist"
import { getPlaylistSongsThunk } from "../../store/playlistSong"
import './Playlists.css'

const Playlists = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const [errors, setErrors] = useState([])
	const [name, setName] = useState('')
	const userId = useSelector((state)=> state.session?.user?.id)
	const playlists = Object.values(useSelector(state => state.playlists))

	// useEffect(() => {
	// 	dispatch(getPlaylistThunk())
	// 	dispatch(getPlaylistSongsThunk())
	// }, [dispatch])

	const handleDelete = async (e, playlistId) => {
		e.preventDefault()
		const response = await dispatch(deletePlaylistThunk(playlistId))
 	}

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
				<div id='playlist-list'>
					{playlists?.map(playlist => (
						<div key={playlist.id}  id='playlist-item'>
							<Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
							{/* <div id='playlist-item' key={playlist.id}>{playlist.name}</div> */}
							<button onClick={e => handleDelete(e, playlist.id)}>delete</button>
						</div>
					))}
				</div>
			</form>
		</div>
	)
}

export default Playlists