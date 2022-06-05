const SET_SONG = 'player/SET_SONG'
const SET_PLAYING = 'player/SET_PLAYING'

const setSong = (song) => ({
	type: SET_SONG,
	song
})

const setPlaying = (playing) => ({
	type: SET_PLAYING,
	playing
})

export const setSongPlaying = () => async (dispatch) => {
	dispatch(setPlaying(true))
}

export const setSongPause = () => async (dispatch) => {
	dispatch(setPlaying(false))
}

export const setCurrentSong = (song) => async (dispatch) => {
	dispatch(setSong(song))
	dispatch(setPlaying(true))
}
let initialState = {

}

const playerReducer = (state = initialState, action) => {
	let newState
	// console.log('here?')
	switch (action.type) {
		case SET_SONG: 
			// console.log(action)
			newState = {
				...state,
				song: action.song
			}
			// console.log(newState)
			return newState
		case SET_PLAYING:
			newState = {
				...state,
				playing: action.playing
			}
			return newState
		default:
			return state
	}
}

export default playerReducer