import { csrfFetch } from "./csrf";

const LOAD = 'playlistSongs/LOAD'
const ADD = 'playlistSongs/ADD'
const DELETE = 'playlistSongs/DELETE'

const loadPlaylistSongs = (playlistId, playlistSongs) => ({
	type: LOAD,
	playlistSongs,
	playlistId
})

const addPlaylistSong = (playlistId, playlistSong) => ({
	type: ADD,
	playlistId,
	playlistSong
})

const deletePlaylistSong = (playlistSongId) => ({
	type: DELETE,
	playlistSongId
})

export const getPlaylistSongsThunk = (playlistId) => async dispatch => {
	const response = await csrfFetch(`/api/playlists/${playlistId}`)

	if (response.ok) {
		const playlistSongs = await response.json()
		dispatch(loadPlaylistSongs(playlistId, playlistSongs))
	}
}

export const addPlaylistSongThunk = (playlistId, songId) => async dispatch => {
	const response = await csrfFetch(`/api/playlists/${playlistId}/${songId}`, {
		method: 'POST',
		body: JSON.stringify({
			playlistId,
			songId
		})
	})

	if (response.ok) {
		const playlistSong = await response.json()
		dispatch(addPlaylistSong(playlistId, playlistSong))
		return playlistSong
	}
}

export const removePlaylistSongThunk = (playlistId, songId) => async dispatch => {
	const response = await csrfFetch(`/api/playlists/${playlistId}/${songId}`, {
		method: 'DELETE'
	})

	if (response.ok) {
		const playlistSong = await response.json()
		dispatch(deletePlaylistSong(playlistId, songId))
		return playlistSong
	}
}

const playlistSongReducer = (state = {}, action) => {
	let newState = { ...state }
	switch(action.type) {
		case LOAD:
			action.playlistSongs.forEach(song => {
				newState[action.playlistId] = [...newState[action.playlistId], song]
			})
			return newState
		case ADD:
			newState = { ...state, [action.playlistId]: [ ...newState[action.playlistId], action.playlistSong ] }
			return newState
		case DELETE:
			newState = { ...state, [action.playlistId]: [ ...newState[action.playlistId].filter(id => id !== action.playlistSongId) ]}
		default:
			return state
	}
}

export default playlistSongReducer