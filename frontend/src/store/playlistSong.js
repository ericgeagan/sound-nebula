import { csrfFetch } from "./csrf";

const LOAD = 'playlistSongs/LOAD'
const ADD_PLAYLISTSONG = 'playlistSongs/ADD_PLAYLISTSONG'
const DELETE_PLAYLISTSONG = 'playlistSongs/DELETE_PLAYLISTSONG'

const loadPlaylistSongs = playlistSongs => ({
	type: LOAD,
	playlistSongs
})

const addPlaylistSong = (playlistId, songId) => ({
	type: ADD_PLAYLISTSONG,
	playlistId,
	songId
})

const deletePlaylistSong = (playlistSongId) => ({
	type: DELETE_PLAYLISTSONG,
	playlistSongId
})

export const getPlaylistSongsThunk = () => async dispatch => {
	const response = await csrfFetch(`/api/playlists/`)
}