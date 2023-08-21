import React, { useState } from 'react'
import { useFormik } from 'formik'
import NewLocation from './NewLocation'
import './Locate.css'
import Info from '../../Layout/Info/Info'

const Locate = ({ userPoints, setUserPoints }) => {
  // Sample locations data
  const [locations, setLocations] = useState([
    {
      'id': 1,
      'name': 'Location A',
      'address1': '123 Main St',
      'address2': 'Suite 456',
      'zip': 10002,
      'recyclables': 'Plastic, Paper',
      'created_by': 'User123',
    },
    {
      'id': 2,
      'name': 'Location B',
      'address1': '456 Elm St',
      'address2': '',
      'zip': 7305,
      'recyclables': 'Glass, Aluminum',
      'created_by': 'User456',
    },
  ])

  // Filtered locations for search
  const [filteredLocations, setFilteredLocations] = useState(locations)

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      location: '',
    },
    onSubmit: values => {
      console.log(values) // Log the submitted form values
      handleSearch(values) // Trigger search after submission
    },
  })

  // Function to handle search based on user input
  const handleSearch = ({ location }) => {
    const filtered = locations.filter(loc => {
      return (
        location === '' || loc.zip === parseInt(location) // Compare zip directly
      )
    })
    setFilteredLocations(filtered)
  }

  const [showSubmitWindow, setShowSubmitWindow] = useState(false)

  // Function to open the submit window
  const openSubmitWindow = () => {
    setShowSubmitWindow(true)
  }

  // Function to cancel submission
  const onCancelSubmit = () => {
    setShowSubmitWindow(false)
  }

  // Function to handle new location submission
  const onNewLocationSubmit = values => {
    setShowSubmitWindow(false)
    const updatedLocations = [...locations, values]
    setLocations(updatedLocations)
    setFilteredLocations(updatedLocations)
    setUserPoints(userPoints + 25)
  }

  return (
    <div>
      <Info text="Search for local recycling plants by zip code! Earn points for contributing any missing facilities to our database!"/>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            name="location"
            placeholder="Search by Zip Code"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
          <button type="submit" onClick={formik.handleSubmit}>
            Search
          </button>
          <button className="add-button" onClick={openSubmitWindow}>
            +
          </button>
        </div>
      </div>
      <div className="card-container">
        {(filteredLocations.length > 0 ? filteredLocations : locations).map(location => (
          <div key={location.id} className="location-card">
            <h3>{location.name}</h3>
            <p>{location.address1}</p>
            <p>{location.address2}</p>
            <p>Recyclables: {location.recyclables}</p>
            <p>Created By: {location.created_by}</p>
          </div>
        ))}
      </div>
      {showSubmitWindow && (
        <div className="submit-location-window">
          <NewLocation onNewLocationSubmit={onNewLocationSubmit} onCancel={onCancelSubmit} />
        </div>
      )}
    </div>
  )
}

export default Locate