import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePlaylistThunk, updatePlaylistThunk } from "../../store/playlist";
import './PlaylistDiv.css'

const PlaylistDiv = ({ playlist }) => {
	const dispatch = useDispatch()
	const [showEdit, setShowEdit] = useState(false)
	const [editName, setEditName] = useState(playlist.name)
	const userId = useSelector((state)=> state.session?.user?.id)

	const handleDelete = async (e, playlistId) => {
		e.preventDefault()
		const response = await dispatch(deletePlaylistThunk(playlistId))
 	}

	const handleEdit = async (e) => {
		e.preventDefault()
		const payload = {
			name: editName,
			userId
		}
		const editedPlaylist = await dispatch(updatePlaylistThunk(payload, playlist.id))
		setShowEdit(false)
	}

	return (
		<div id='playlist-item'>
			{showEdit 
			? <form onSubmit={handleEdit} id='edit-container'>
					<input
						id='edit-form'
						placeholder="Name (Max 24)"
						type='text'
						value={editName}
						required={true}
						maxLength={24}
						onChange={e => setEditName(e.target.value)} />
					<button id='edit' type='submit'>Update</button>
				</form> 
			: <Link id="playlist-name" to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
			}
			{/* <div id='playlist-item' key={playlist.id}>{playlist.name}</div> */}
			{/* <button onClick={e => handleDelete(e, playlist.id)}>delete</button> */}
			<div id='mod-container'>
				{showEdit 
				? <button type="button" id='edit' onClick={e => setShowEdit(!showEdit)}>Cancel</button> 
				: <button type="button" id='edit' onClick={e => setShowEdit(!showEdit)}>Edit</button>
				}
				<i id='x' className="fa-regular fa-circle-xmark" onClick={e => handleDelete(e, playlist.id)}></i>
			</div>
		</div>
	)
}

export default PlaylistDiv