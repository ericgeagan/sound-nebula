import { csrfFetch } from "./csrf";

const LOAD = 'playlistSongs/LOAD'
const ADD = 'playlistSongs/ADD'
const DELETE = 'playlistSongs/DELETE'

const loadPlaylistSongs = (playlistSongs) => ({
	type: LOAD,
	playlistSongs
})

const addPlaylistSong = (playlistId, playlistSong) => ({
	type: ADD,
	playlistId,
	playlistSong
})

const deletePlaylistSong = (playlistId, songId) => ({
	type: DELETE,
	playlistId,
	songId
})

export const getPlaylistSongsThunk = () => async dispatch => {
	// const response = await csrfFetch(`/api/playlists/${playlistId}`)
	const response = await csrfFetch(`/api/playlists/getAllPlaylistSongs`)

	if (response.ok) {
		const playlistSongs = await response.json()
		dispatch(loadPlaylistSongs(playlistSongs))
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
			// console.log(action.playlistSongs)
			action.playlistSongs.forEach(song => {
				if (!newState[song.playlistId]) {
					newState[song.playlistId] = {}
				}
				newState[song.playlistId][song.songId] = song
			})
			return newState
		case ADD:
			// newState = { ...state, [action.playlistId][action.playlistSong.songId]: action.playlistSong }
			if (!newState[action.playlistId]) {
				newState[action.playlistId] = {}
			}
			newState[action.playlistId][action.playlistSong.songId] = action.playlistSong
			return newState
		case DELETE:
			// newState = { ...state, [action.playlistId]: [ ...newState[action.playlistId].filter(id => id !== action.playlistSongId) ]}
			delete newState[action.playlistId][action.songId]
			return newState
		default:
			return state
	}
}

export default playlistSongReducer