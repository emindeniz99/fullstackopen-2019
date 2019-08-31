import React from "react"

const Notification = ({ message, type }) => {
	if (message === null) {
		return null
	}

	return (
		<div
			className="notification"
			style={{ color: type === "success" ? "green" : "red" }}
		>
			{message}
		</div>
	)
}

export default Notification
