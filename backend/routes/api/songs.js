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