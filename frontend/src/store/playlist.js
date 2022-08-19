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