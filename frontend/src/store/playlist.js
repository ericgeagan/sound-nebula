import { csrfFetch } from "./csrf";

const LOAD = 'playlists/LOAD'
const ADD_PLAYLIST = 'playlists/ADD_PLAYLIST'
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST'

const loadPlaylists = playlists => ({
	type: LOAD,
	playlists
})

const addPlaylist = playlist => ({
	type: ADD_PLAYLIST,
	playlist
})

const deletePlaylist = playlistId => ({
	type: DELETE_PLAYLIST,
	playlistId
})

export const getPlaylistThunk = () => async dispatch => {
	const response = await csrfFetch(`/api/playlists`)

	if (response.ok) {
		const list = await response.json()
		dispatch(loadPlaylists(list))
	}
}

export const addPlaylistThunk = (payload) => async dispatch => {
	const response = await csrfFetch(`/api/playlists`, {
		method: 'POST',
		body: JSON.stringify(payload)
	})

	if (response.ok) {
		const playlist = await response.json()
		dispatch(addPlaylist(playlist))
		return playlist
	}
}

export const deletePlaylistThunk = playlistId => async dispatch => {
	const response = await csrfFetch(`/api/playlists/${playlistId}`, {
		method: 'DELETE'
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(deletePlaylist(playlistId))
		return data
	}
}

export const updatePlaylistThunk = (payload, playlistId) => async dispatch => {
	const response = await csrfFetch(`/api/playlists/${playlistId}`, {
		method: 'PUT',
		body: JSON.stringify(payload)
	})

	if (response.ok) {
		const playlist = await response.json()
		dispatch(addPlaylist(playlist, playlistId))
		return playlist
	}
}

const playlistReducer = (state = {}, action) => {
	let newState = { ...state }
	switch(action.type) {
		case LOAD:
			action.playlists.forEach(playlist => {
				newState[playlist.id] = playlist
			})
			return newState
		case ADD_PLAYLIST:
			newState = { ...state, [action.playlist.id]: action.playlist }
			return newState
		case DELETE_PLAYLIST:
			newState = { ...state }
			delete newState[action.playlistId]
			return newState
		default:
			return state
	}
}

export default playlistReducer