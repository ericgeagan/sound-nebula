const express = require('express')
const asyncHandler = require('express-async-handler')

const { requireAuth } = require('../../utils/auth')
const { Comment } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

const validateComment = [
	check('body')
		.exists({ checkFalsy: true })
		.withMessage('Please provide valid text.'),
	handleValidationErrors
]