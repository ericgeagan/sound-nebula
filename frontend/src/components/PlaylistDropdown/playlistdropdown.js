import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const PlaylistDropdown = () => {
	const user = useSelector(state=> state.session.user)
	const dispatch = useDispatch()
	const playlists = Object.values(useSelector(state => state.playlists)).filter(playlist => playlist.userId === user?.id)
	const [dropdownOpen, setDropDownOpen] = useState(false)

	useEffect(() => {
		const closeDropdown = e => {
			if (e.path[1].className !== 'dont-close' && e.path[1].className !== 'dont-close' && e.path[0].className !== 'fa-solid fa-caret-down dont-close' && e.path[0].className !== 'dont-close' ) {
				setDropDownOpen(false)
			}
		}

		document.body.addEventListener('click', closeDropdown)

		return () => document.body.removeEventListener('click', closeDropdown)
	})

	handleDropDownClick = e => {
		setDropDownOpen(!dropdownOpen)
	}

	return (
		<div></div>
	)
}

export default PlaylistDropdown