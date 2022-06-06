const express = require('express')
const asyncHandler = require('express-async-handler')
// const AWS = require('aws-sdk')
// const config = require('../../config/index')
// const awsId = config.aws

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
	check('title')
		.exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage('Song title is too long.'),
	check('body')
		.exists({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage('Description is too long.'),
	handleValidationErrors
]

const validateComment = [
	check('body')
		.exists({ checkFalsy: true })
		.isLength({ max: 255 })
		.withMessage('Comment is too long.'),
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

// const s3 = new AWS.S3({
// 	accessKeyId: awsId.accessKey,
// 	secretAccessKey: awsId.secretAccessKey
// })

// const uploadFile = async (file, title) => {
// 	// Read content from the file

// 	// Setting up S3 upload parameters
// 	const params = {
// 			Bucket: 'BUCKET_NAME',
// 			Key: title, // File name you want to save as in S3
// 			Body: file
// 	};

// 	// Uploading files to the bucket
// 	const songUrl = await s3.upload(params, (err, data) => {
// 			if (err) {
// 					throw err;
// 			}
// 			console.log(`File uploaded successfully. ${data.Location}`);
// 			return data.Location
// 	});
// 	return songUrl
// };

// router.post(
// 	'/upload',
// 	asyncHandler(async (req, res) => {
// 		console.log('router here')
// 		const song = req.files['song']
// 		let image
// 		if (req.files['image']) {
// 			image = req.files['image']
// 		}

// 		const s3params = {
// 			Bucket: 'soundnebula',
// 			Key: song.title,
// 			Body: song
// 		}

// 		s3.upload(s3params, (err, data) => {
// 			if (err) {
// 				throw err
// 			}
// 			console.log('File uploaded successfully', data.location)
// 			return {
// 				song_path: data.location
// 			}
// 		})
// 	})
// )

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
	validateComment,
	asyncHandler(async (req, res) => {
		const id = await Comment.create(req.body)
		// return res.redirect(`${req.baseUrl}/${id}`);
		console.log(id)
		return res.json(id)
}))

// Update comment route
router.put(
	'/:songId/comments/:commentId',
	requireAuth,
	asyncHandler(async (req, res) => {
		const comment = req.body
		const commentId = req.params.commentId
		const updatedComment = await Comment.update(
			comment,
			{
				where: { id: commentId },
				returning: true,
				plain: true
			}
		)
		// console.log("ANYTING FORM HERE?", updatedComment)
		return res.json(updatedComment[1])
	})
)

// Delete comment route
router.delete(
	'/:songId/comments/:commentId',
	requireAuth,
	asyncHandler(async (req, res) => {
		const songId = parseInt(req.params.songId)
		const commentId = parseInt(req.params.commentId)
		const comment = await Comment.findByPk(commentId)
		if (comment) {
			comment.destroy()
			res.json({ "message": "Delete Successful" })
		} else {
			res.json({ "message": "Delete Failed"})
		}
	})
)

// Update song route
router.put(
	'/:id', 
	validateSong, 
	requireAuth,
	asyncHandler(async (req, res) => {
		const song = req.body
		const id = req.params.id
		// delete song.id
		const updatedSong = await Song.update(
			song, 
			{
				where: { id },
				returning: true,
				plain: true
			})
		return res.json(updatedSong[1])
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