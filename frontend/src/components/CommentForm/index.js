import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createComment } from "../../store/song";
import './CommentForm.css';

const CommentForm = ({ songId }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [comment, setComment] = useState('')
	const userId = useSelector((state)=> state.session?.user?.id)
	const username = useSelector(state => state.session?.user?.username)

	const handleSubmit = async (e) => {
		if (!userId) {
			history.push(`/signup`)
		} else {
			e.preventDefault()
			const payload = {
				body: comment,
				songId,
				username,
				userId
			}
			let newComment = await dispatch(createComment(payload, songId))
			setComment('')
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Comment"
					type='text'
					value={comment}
					required={true}
					onChange={(e) => setComment(e.target.value)} />
				<button type='submit'>Submit</button>
			</form>
		</>
	)
}

export default CommentForm