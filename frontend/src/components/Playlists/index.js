import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { addPlaylistThunk, deletePlaylistThunk, getPlaylistThunk } from "../../store/playlist"
import { getPlaylistSongsThunk } from "../../store/playlistSong"
import PlaylistDiv from "../PlaylistDiv/playlistdiv"
import './Playlists.css'

const Playlists = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const [errors, setErrors] = useState([])
	const [name, setName] = useState('')
	const userId = useSelector((state)=> state.session?.user?.id)
	const playlists = Object.values(useSelector(state => state.playlists))
	const sessionUser = useSelector(state => state.session.user);

	if (!sessionUser) {
		history.push('/')
	}
	// useEffect(() => {
	// 	dispatch(getPlaylistThunk())
	// 	dispatch(getPlaylistSongsThunk())
	// }, [dispatch])

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
					placeholder="Name (Max 24)"
					type='text'
					value={name}
					required={true}
					maxLength={24}
					onChange={e => setName(e.target.value)} />
				<button type='submit'>Add</button>
			</form>
			<div id='playlist-list'>
				{playlists?.map(playlist => (
					<PlaylistDiv key={playlist.id} playlist={playlist} />
				))}
			</div>
		</div>
	)
}

export default Playlists