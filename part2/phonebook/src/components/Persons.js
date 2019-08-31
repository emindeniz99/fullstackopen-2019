import React from "react"

const Persons = ({ numbersToShow, deletePerson }) => {
	return numbersToShow.map(person => (
		<div key={person.id}>
			{person.name} {person.number}
			<button
				style={{ marginLeft: "10px" }}
				onClick={() => {
					if (window.confirm(`Delete ${person.name}`)) {
						deletePerson(person.id)
					}
				}}
			>
				delete
			</button>
		</div>
	))
}

export default Persons
