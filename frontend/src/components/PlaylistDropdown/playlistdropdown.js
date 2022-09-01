import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addPlaylistSongThunk, getPlaylistSongsThunk, removePlaylistSongThunk } from "../../store/playlistSong"
import './PlaylistDropdown.css'

const PlaylistDropdown = ({ songId }) => {
	const user = useSelector(state=> state.session.user)
	const dispatch = useDispatch()
	const playlists = Object.values(useSelector(state => state.playlists)).filter(playlist => playlist.userId === user?.id)
	const playlistSongs = useSelector(state => state.playlistSongs)
	const [dropDownOpen, setDropDownOpen] = useState(false)

	useEffect(() => {
		dispatch(getPlaylistSongsThunk())
	}, [dispatch])


	useEffect(() => {
		const closeDropdown = e => {
			if (e.path[1].className !== 'dont-close' && e.path[1].className !== 'dont-close' && e.path[0].className !== 'fa-solid fa-caret-down dont-close' && e.path[0].className !== 'dont-close' ) {
				setDropDownOpen(false)
			}
		}

		document.body.addEventListener('click', closeDropdown)

		return () => document.body.removeEventListener('click', closeDropdown)
	})

	const handleDropDownClick = e => {
		setDropDownOpen(!dropDownOpen)
	}

	const handleAddToPlaylist = async e => {
		const playlist = playlists.find(playlist => playlist.id === Number(e.target.attributes[1].value))

		await dispatch(addPlaylistSongThunk(playlist.id, songId))
		setDropDownOpen(false)
	}

	const handleRemoveFromPlaylist = async e => {
		const playlist = playlists.find(playlist => playlist.id === Number(e.target.attributes[1].value))

		await dispatch(removePlaylistSongThunk(playlist.id, songId))
		setDropDownOpen(false)
	}

	return (
		<div>
			<div id='playlist-main' className='dont-close'>
				<div id='playlist-container'>
					<div id='label' className="dont-close" onClick={(e) => handleDropDownClick(e)}>Add to Playlist</div>
					<div id='label-button' className='dont-close' onClick={(e) => handleDropDownClick(e)}><i className="fa-solid fa-caret-down dont-close"></i></div>
				</div>
				{dropDownOpen && 
				<div>
					<div id='playlist-select' className='dont-close'>
						{playlists.length > 0 ? playlists.map(playlist => (
							playlistSongs[playlist.id] && playlistSongs[playlist.id][songId]
								? <div id='playlist-option' onClick={e => handleRemoveFromPlaylist(e)} value={playlist.id} key={playlist.id}><i id='check' className="fa-solid fa-check"></i>{playlist.name}</div> 
								: <div id='playlist-option' onClick={e => handleAddToPlaylist(e)} value={playlist.id} key={playlist.id}>{playlist.name}</div> 
						)) : <Link id='playlist-option' to='/playlists' >Create a Playlist</Link> }
					</div>
				</div>
				}
			</div>
		</div>
	)
}

export default PlaylistDropdown