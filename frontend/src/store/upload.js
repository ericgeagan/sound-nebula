import { csrfFetch } from './csrf';

export const uploadFile = (file) => async (dispatch) => {
	const response = await csrfFetch('/api/songs/upload', {
		method: "POST",
		body: file
	})

	if (response.ok) {
		const data = await response.json()
		console.log(data)
		return data
	}
}