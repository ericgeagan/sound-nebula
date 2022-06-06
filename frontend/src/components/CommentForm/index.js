import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createComment } from "../../store/song";
import './CommentForm.css';

const CommentForm = ({ songId }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [comment, setComment] = useState('')
	const [errors, setErrors] = useState([])
	const userId = useSelector((state)=> state.session?.user?.id)
	const username = useSelector(state => state.session?.user?.username)

	const handleSubmit = (e) => {
		e.preventDefault()
		setErrors([])
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
			let newComment = dispatch(createComment(payload, songId)).catch(
				async (res) => {
					const data = await res.json()
					if (data && data.errors) setErrors(data.errors)
				}
			)
			setComment('')
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<ul>
          {errors.map((error, idx) => (
            <li className="error2" key={idx}>{error}</li>
          ))}
        </ul>
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