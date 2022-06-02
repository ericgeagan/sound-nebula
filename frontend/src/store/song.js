import { csrfFetch } from './csrf';

const LOAD = 'songs/LOAD'
const ADD_ONE = 'songs/ADD_ONE'
const UPDATE = 'songs/UPDATE'
const DELETE = 'songs/DELETE'

const load = list => ({
	type: LOAD,
	list
})

const addOneSong = song => ({
	type: ADD_ONE,
	song
})

export const getSong = () => async dispatch => {
	const response = await csrfFetch(`/api/songs`)

	if (response.ok) {
		const list = await response.json()
		dispatch(load(list))
	}
}

export const getOneSong = (songId) => async dispatch => {
	const response = await csrfFetch(`/api/songs/${songId}`)

	if (response.ok) {
		const singleSong = await response.json()
		dispatch(addOneSong(singleSong))
	}
}

export const createSong = (payload) => async (dispatch) => {
	const response = await csrfFetch('/api/songs', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})

	if (response.ok) {
		const song = await response.json()
		dispatch(addOneSong(song))
		return song
	}
}

export const editSong = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs/${payload.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})

	if (response.ok) {
		const song = await response.json()
		dispatch(addOneSong(song))
		return song
	}
}

const initialState = {
	list: []
}

const songReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			const allSongs = {}
			action.list.forEach(song => {
				allSongs[song.id] = song
			})
			return {
				...allSongs,
				...state,
				list: action.list
			}
		case ADD_ONE:
			const newState = {
				...state,
				[action.song.id]: action.song,
				list: [...state.list, action.song]
			}
			// const songList = newState.list.map(id => newState[id])
			// songList.push(action.song)
			// songList = [...songList, action.song]
			return newState
			// return {
			// 	...state,
			// 	[action.song.id]: {
			// 		...state[action.song.id],
			// 		...action.song
			// 	}
			// }
		default:
			return state
	}
}

export default songReducer