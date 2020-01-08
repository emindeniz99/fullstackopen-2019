import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import personsService from "./services/persondb"
import Notification from "./components/Notification"

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [searchText, setSearchText] = useState("")
	const [successMessage, setSuccessMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		personsService.getPersons().then(res => setPersons(res))
	}, [])

	const handleNameChange = event => {
		setNewName(event.target.value)
	}
	const handleNumberChange = event => {
		setNewNumber(event.target.value)
	}
	const handleSearchChange = event => {
		setSearchText(event.target.value)
	}

	const addPerson = event => {
		event.preventDefault()

		if (!newName.trim() || !newNumber.trim()) {
			setErrorMessage(`Please fill the inputs`)
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
			return
		}
		let isNew = true
		persons.forEach(person => {
			if (person.name === newName) {
				isNew = false
				if (
					window.confirm(
						`${newName} is already added to phonebook, replace the old number with a new one?`
					)
				) {
					personsService
						.updatePerson({ ...person, number: newNumber })
						.then(res => {
							setPersons(
								persons.map(per =>
									per.id === person.id ? res : per
								)
							)

							setSuccessMessage(
								`Changed Number of ${person.name}`
							)
							setTimeout(() => {
								setSuccessMessage(null)
							}, 5000)
						})
						.catch(err => {
							setErrorMessage(
								`Information of ${person.name} has already been removed from server`
							)
							setTimeout(() => {
								setErrorMessage(null)
							}, 5000)
						})
				}
			}
		})
		if (isNew) {
			personsService
				.addPerson({
					name: newName,
					number: newNumber
				})
				.then(response => {
					setPersons(persons.concat(response))
					setSuccessMessage(`Added ${newName}`)
					setTimeout(() => {
						setSuccessMessage(null)
					}, 5000)
				})
				.catch(error => {
					setErrorMessage(
						error.response.data.error
					)
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
				})
		}
		setNewName("")
		setNewNumber("")
	}

	const numbersToShow = persons.filter(person =>
		person.name.toLowerCase().includes(searchText.toLowerCase())
	)

	const deletePerson = id => {
		personsService
			.deletePerson(id)
			.then(setPersons(persons.filter(person => person.id !== id)))
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={successMessage} type="success" />
			<Notification message={errorMessage} type="error" />

			<Filter handleSearchChange={handleSearchChange} />
			<h2>add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newNumber={newNumber}
				newName={newName}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons
				numbersToShow={numbersToShow}
				deletePerson={deletePerson}
			/>
		</div>
	)
}

export default App
