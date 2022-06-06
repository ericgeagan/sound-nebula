# SoundNebula

SoundNebula is a web application for sharing and listening to music. It was
 inspired by SoundCloud and built using Redux, React.js, and React-Player.

Explore and Listen at [https://soundnebula.herokuapp.com/](https://soundnebula.herokuapp.com/)

### Home View:

![stream](https://i.gyazo.com/ed4a4aab614aef3f0ea81e3ddfe296a9.png)

### Song View:
![song](https://i.gyazo.com/d273b98b4cc8b0016276d36b80cda2b1.png)

### Technical Details:
* SoundNebula uses a prebuilt react component from the react-player package. I did have to add additional redux thunk actions in order to be able to detect and modify the currently playing song throughout the entire application

```
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
```

* I also added a couple state hooks in order to make the play buttons display correctly whether the song was playing or not.

```
	const dispatch = useDispatch()
	const playing = useSelector(state => state.player?.playing)
	const currentSongId = useSelector(state => state.player?.song)
	const sameCurrentSong = currentSongId === songId
	const [pause, setPause] = useState(!!playing)
  
	const playSong = (e) => {
		e.preventDefault()
		if (playing && sameCurrentSong) {
			// setPause(false)
			return dispatch(setSongPause())
		} else if (!playing && sameCurrentSong) {
			// setPause(true)
			return dispatch(setSongPlaying())
		}
		// setPause(true)
		return dispatch(setCurrentSong(songId))
	}
  
	useEffect(() => {
		if (playing && sameCurrentSong) {
			setPause(true)
		} else if (!playing && sameCurrentSong) {
			setPause(false)
		} else if (playing && !sameCurrentSong && pause) {
			setPause(false)
		}
	}, [playing, currentSongId])
```

### Features
* Sign up/in with email or username
* Main page shows all uploaded songs
* Upload your own tracks
* You can edit or delete your own tracks but not other users'
* You can add comments to songs if you are logged in
* You can edit or delete your own comments but not other users'

### To-Do:
* [ ] Likes
* [ ] Search
* [ ] Genres
* [ ] Playlists
* [ ] Randomize songs on homepage
* [ ] Continous play
* [ ] Add ability to upload real files instead of urls
