import { csrfFetch } from "./csrf";

const LOAD = 'playlists/LOAD'
const ADD_PLAYLIST = 'playlists/ADD_PLAYLIST'

const loadPlaylists = playlists => ({
	type: LOAD,
	playlists
})

const addPlaylist = playlist => ({
	type: ADD_PLAYLIST,
	playlist
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
		default:
			return state
	}
}

export default playlistReducer