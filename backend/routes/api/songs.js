const express = require('express')
const asyncHandler = require('express-async-handler')

const { requireAuth } = require('../../utils/auth')
const { Song, Comment } = require('../../db/models')
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

// Create song route
router.post(
	'/', 
	validateSong, 
	requireAuth,
	asyncHandler(async (req, res) => {
		// get userid and add it to the obj?
		const song = await Song.create(req.body)
		// console.log('here', req.baseUrl, id)
		// return res.redirect(`${req.baseUrl}/${song.dataValues.id}`)
		// return res.redirect(`/`)
		return res.json(song)
}))

// Read route (get all songs)
router.get(
	'/', 
	asyncHandler(async (req, res) => {
		// Can change this to first X songs later
		const songs = await Song.findAll()
		return res.json(songs)
}))

// Read route (one song)
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const song = await Song.findByPk(req.params.id)
		return res.json(song)
}))

// Get all song's comments
router.get(
	'/:id/comments', 
	asyncHandler(async (req, res) => {
		const comments = await Comment.findAll({
			where: {
				songId: req.params.id
			}
		})
		return res.json(comments)
}))

// Add comment to song
router.post(
	'/:id/comments', 
	requireAuth,
	asyncHandler(async (req, res) => {
		const id = await Comment.create(req.body)
		return res.redirect(`${req.baseUrl}/${id}`);
}))

// Update song route
router.put(
	'/:id', 
	validateSong, 
	requireAuth,
	asyncHandler(async (req, res) => {
		const song = req.body
		const id = req.params.id
		delete song.id
		const updatedSong = await Song.update(
			song, 
			{
				where: { id },
				// returning: true,
				// plain: true
			})
		return res.json(updatedSong)
}))

// Delete song route
router.delete(
	'/:id', 
	requireAuth,
	asyncHandler(async (req, res) => {
		const songId = parseInt(req.params.id)
		const song = await Song.findByPk(songId)
		if (song) {
			song.destroy()
			res.json({ "message": "Delete Successful" })
		} else {
			res.json({ "message": "Delete Failed" })
		}
}))

module.exports = router;