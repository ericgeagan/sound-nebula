import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CommentBox.css';
import { editComment, deleteComment } from "../../store/song";

const CommentBox = ({ comment }) => {
	const dispatch = useDispatch()
	const [showForm, setShowForm] = useState(false)
	const [editedComment, setEditedComment] = useState(comment.body)
	const userId = useSelector((state)=> state.session?.user?.id)

	const openEdit = (e) => {
		e.preventDefault()
		if (showForm) {
			setEditedComment(comment.body)
		}
		setShowForm(!showForm)
	}

	// Function for editing a comment
	const handleSubmit = async (e) => {
		e.preventDefault()
		const payload = {
			body: editedComment,
			songId: comment.songId,
			username: comment.username,
			userId
		}
		let updatedComment = await dispatch(editComment(payload, comment.id))
		setShowForm(!showForm)
	}

	const handleDelete = async (e) => {
		e.preventDefault()
		const payload = {
			userId,
			songId: comment.songId,
			commentId: comment.id
		}
		await dispatch(deleteComment(payload))
	}

	if(!comment) {
		return null
	}

	return (
		<>
			<div key={comment.id}>
				{	showForm 
					? <div>
							<form onSubmit={handleSubmit}>
								<input 
									type='text'
									value={editedComment}
									onChange={(e) => setEditedComment(e.target.value)}
								/>
								<button type='submit'>Submit</button>
							</form>
							<button className="button" onClick={openEdit}>Cancel</button>
						</div>

					: <div className="comment-div">
							<div className="comment-content">
								<p className="comment">{comment.body}</p>
								<p className="comment">User: {comment.username}</p>
								{userId === comment.userId ? <button className="button" onClick={openEdit}>Edit</button> : null}
								{userId === comment.userId ? <button className="button" onClick={handleDelete}>Delete</button> : null}
							</div>
						</div>
				}

			</div>
		</>
	)
}

export default CommentBox