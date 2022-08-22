import { csrfFetch } from './csrf';

const LOAD = 'songs/LOAD'
const ADD_ONE = 'songs/ADD_ONE'
const UPDATE = 'songs/UPDATE'
const REMOVE = 'songs/REMOVE'
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'
const ADD_COMMENT = 'comments/ADD_COMMENT'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

const load = list => ({
	type: LOAD,
	list
})

const addOneSong = song => ({
	type: ADD_ONE,
	song
})

const update = song => ({
	type: UPDATE,
	song
})

const remove = (songId) => ({
	type: REMOVE,
	songId
})

const loadComments = (list, songId) => ({
	type: LOAD_COMMENTS,
	list,
	songId
})

const addComment = (comment, songId) => ({
	type: ADD_COMMENT,
	comment,
	songId
})

const updateComment = (comment, songId) => ({
	type: UPDATE_COMMENT,
	comment,
	songId
})

const removeComment = (commentId, songId) => ({
	type: REMOVE_COMMENT,
	commentId,
	songId
})

export const getSong = () => async dispatch => {
	const response = await csrfFetch(`/api/songs`)

	if (response.ok) {
		const list = await response.json()
		dispatch(load(list))
	}
}

export const getComments = (songId) => async dispatch => {
	const response = await csrfFetch(`/api/songs/${songId}/comments`)

	if (response.ok) {
		const comments = await response.json()
		dispatch(loadComments(comments, songId))
	}
}

export const createComment = (payload, songId) => async dispatch => {
	const response = await csrfFetch(`/api/songs/${songId}/comments`, {
		method: 'POST',
		body: JSON.stringify(payload)
	})

	if (response.ok) {
		const comment = await response.json()
		dispatch(addComment(comment, songId))
		return comment
	}
}

export const editComment = (payload, commentId) => async dispatch => {
	// console.log("checking thunk action", payload, commentId)
	const response = await csrfFetch(`/api/songs/${payload.songId}/comments/${commentId}`, {
		method: 'PUT',
		body: JSON.stringify(payload)
	})

	if (response.ok) {
		const comment = await response.json()
		// console.log('UPDATED COMMENT', comment)
		dispatch(updateComment(comment, payload.songId))
		return comment
	}
}

export const deleteComment = ({userId, songId, commentId}) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs/${songId}/comments/${commentId}`, {
		method: 'DELETE'
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(removeComment(commentId, songId))
		return data
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

export const editSong = (payload, songId) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs/${songId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})

	if (response.ok) {
		const song = await response.json()
		// console.log('UPDATED SONG', song)
		dispatch(update(song))
		return song
	}
}

export const deleteSong = ({userId, songId}) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs/${songId}`, {
		method: 'DELETE'
	})

	if (response.ok) {
		const data = await response.json()
		dispatch(remove(songId))
		return data
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
		case UPDATE:
			const updatedState = {
				...state,
			}
			updatedState[action.song.id] = action.song
			updatedState.list = [...state.list.filter(song => song.id !== action.song.id), action.song]
			return updatedState
		case LOAD_COMMENTS:
			// console.log('test')
			return {
				...state,
				[action.songId]: {
					...state[action.songId],
					comments: action.list.map(comment => comment)
				},
			}
		case ADD_COMMENT:
			return {
				...state,
				[action.songId]: {
					...state[action.songId],
					comments: [...state[action.songId]?.comments, action.comment]
				}
			}
		case UPDATE_COMMENT:
			const editCommentState = {
				...state,
			}
			let oldComments = [...state[action.songId]?.comments] || []
			// console.log(oldComments, action.songId)
			// console.log('reducer', action.comment, action.songId)
			// console.log('1st oldcomments', oldComments)
			if (oldComments?.length) {
				// console.log('is it getting here?', oldComments)
				let index = oldComments.findIndex(comment => comment.id === action.comment.id)
				oldComments.splice(index, 1, action.comment)
				// console.log('after filter', oldComments)
			}
			// console.log('2nd oldcomm', oldComments)
			editCommentState[action.songId] = {
				...state[action.songId],
				comments: [...oldComments]
			}
			return editCommentState
		case REMOVE_COMMENT:
			const removeCommentState = {
				...state
			}
			let prevComments = [...state[action.songId]?.comments] || []
			if (prevComments?.length) {
				let index = prevComments.findIndex(comment => comment.id === action.commentId)
				prevComments.splice(index, 1)
			}
			removeCommentState[action.songId] = {
				...state[action.songId],
				comments: [...prevComments]
			}
			return removeCommentState
		default:
			return state
	}
}

export default songReducer