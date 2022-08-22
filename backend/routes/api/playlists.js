const express = require('express')
const asyncHandler = require('express-async-handler')

const { requireAuth } = require('../../utils/auth')
const { Playlist, PlaylistSong } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

const validatePlaylist = [
	check('name')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a valid name.'),
	handleValidationErrors
]

// Get all playlists
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const playlists = await Playlist.findAll()
		return res.json(playlists)
	})
)

// Create Playlist
router.post(
	'/',
	validatePlaylist,
	requireAuth,
	asyncHandler(async (req, res) => {
		// console.log(req.body)
		const playlist = await Playlist.create(req.body)
		return res.json(playlist)
	})
)

// Get all playlistSongs (only logged in)
router.get(
	'/:playlistId',
	requireAuth,
	asyncHandler(async (req, res) => {
		const playlistSongs = await PlaylistSong.findAll({
			where: {
				playlistId: req.params.playlistId
			}
		})
		return res.json(playlistSongs)
	})
)

// Add song to playlist
router.post(
	'/:playlistId/:songId',
	requireAuth,
	asyncHandler(async (req, res) => {
		const playlistId = parseInt(req.params.playlistId)
		const songId = parseInt(req.params.songId)
		const playlistSong = await PlaylistSong.create({
			playlistId,
			songId,
		})
	})
)

router.delete(
	'/:playlistId/:songId',
	requireAuth,
	asyncHandler(async (req, res) => {
		const playlistId = parseInt(req.params.playlistId)
		const songId = parseInt(req.params.songId)
		const playlistSong = await PlaylistSong.findByPk(songId)
		if (playlistSong) {
			playlistSong.destroy()
			res.json({ 'message': 'Delete Successful' })
		} else {
			res.json({ 'message': 'Delete Failed' })
		}
	})
)

router.delete(
	'/:id',
	requireAuth,
	asyncHandler(async (req, res) => {
		const playlistId = parseInt(req.params.id)
		const playlist = await Playlist.findByPk(playlistId)
		if (playlist) {
			playlist.destroy()
			res.json({ 'message': 'Delete Successful' })
		} else {
			res.json({ 'message': 'Delete Failed' })
		}
	})
)

router.put(
	'/:id',
	validatePlaylist,
	requireAuth,
	asyncHandler(async (req, res) => {
		const playlist = req.body
		const id = req.params.id
		const updatedPlaylist = await Playlist.update(
			playlist,
			{
				where: { id },
				returning: true,
				plain: true
			}
		)
		return res.json(updatedPlaylist[1])
	})
)

module.exports = router