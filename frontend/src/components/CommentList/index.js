import React, { useEffect, useState } from "react";
import './CommentList.css';

const CommentList = ({ comments }) => {

	if(!comments) {
		return null
	}

	return (
		<>
			{comments.map(comment => (
				<div key={comment.id}>{comment.body}</div>
			))}
		</>
	)
}

export default CommentList