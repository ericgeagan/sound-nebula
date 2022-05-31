const express = require('express')
const asyncHandler = require('express-async-handler')

const { requireAuth } = require('../../utils/auth')
const { Song } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

const validateSong = [
	check('url')
		.exists({ checkFalsy: true })
		.isURL()
		.withMessage('Please provide a valid URL.'),
	check('title')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a song title.'),
	handleValidationErrors
]

// Create route
router.post(
	'/', 
	validateSong, 
	asyncHandler(async (req, res) => {
		// get userid and add it to the obj?
		const id = await Song.create(req.body)
		return res.redirect(`${req.baseUrl}/${id}`)
}))

// Read route (get all songs)
router.get(
	'/', 
	asyncHandler(async (req, res) => {
		// Can change this to first X songs later
		const songs = await Songs.findAll()
		return res.json(songs)
}))

// Read route (one song)
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const song = await Song.one(req,params.id)
		return res.json(song)
}))

// Update route
router.put(
	'/:id', 
	validateSong, 
	asyncHandler(async (req, res) => {
		const song = req.body
		const id = song.id
		delete song.id
		await Song.update(
			song, 
			{
				where: { id },
				returning: true,
				plain: true
			})
		return id
}))