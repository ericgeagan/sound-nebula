import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Upload.css';

const Upload = () => {
	return (
		<>
			<h1>Add new song</h1>
			<form>
				<input 
					placeholder="Image URL"
					type='url'/>
				<input 
					placeholder="Song URL"
					type='url'/>
				<input 
					placeholder="Song Title"
					type='text'/>
				<input 
					placeholder="Description"
					type='text' />
			</form>
		</>
	)
}

export default Upload