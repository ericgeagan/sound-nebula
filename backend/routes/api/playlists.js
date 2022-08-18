const express = require('express')
const asyncHandler = require('express-async-handler')

const { requireAuth } = require('../../utils/auth')
const { Playlist } = require('../../db/models')
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
		const playlist = await Playlist.create(req.body)
		return res.json(playlist)
	})
)

module.exports = router