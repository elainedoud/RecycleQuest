import React, { useEffect, useState, useContext } from 'react'
import { useFormik } from 'formik'
import NewLocation from './NewLocation'
import './Locate.css'
import Info from '../../Layout/Info/Info'
import './NewLocation.css'
import UserContext from "../../Context/UserContext"


const Locate = () => {
  const { user, userPoints, setUserPoints } = useContext(UserContext)
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [showSubmitWindow, setShowSubmitWindow] = useState(false)

  const formik = useFormik({
    initialValues: {
      location: '',
      recyclables: '',
    },
    onSubmit: values => {
      handleSearch(values)
    },
  })

  useEffect(() => {
    fetch("/alllocations")
      .then(r => r.json())
      .then(data => {
        setLocations(data)
        setFilteredLocations(data)
      })
  }, [])

  const handleSearch = ({ location, recyclables }) => {
    const filtered = locations.filter(loc => {
      const Match = location === '' || loc.code === location.toString()
      const recyclablesMatch = recyclables === '' || loc.accepted_recyclables.includes(recyclables)

      return Match && recyclablesMatch
    })
    setFilteredLocations(filtered)
  }

  const openSubmitWindow = () => {
    setShowSubmitWindow(true)
  }

  const onCancelSubmit = () => {
    setShowSubmitWindow(false)
  }

  const onNewLocationSubmit = values => {
    setShowSubmitWindow(false)
    const updatedLocations = [...locations, values]
    setLocations(updatedLocations)
    setFilteredLocations(updatedLocations)
    setUserPoints(userPoints + 25)
  }

  return (
    <div>
      <Info text="Search for local recycling plants by zupcode or type of recycleable! Earn points for contributing any missing facilities to our database!" />
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            name="location"
            placeholder="Search by Zipcode"
            value={formik.values.location}
            onChange={formik.handleChange}
            className="locate"
          />
          <input
            type="text"
            name="recyclables"
            placeholder="Search by Recyclables"
            value={formik.values.recyclables}
            onChange={formik.handleChange}
            className="locate"
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
        {filteredLocations.length > 0 ? (
          filteredLocations.map(location => (
            <div key={location.id} className="location-card">
              <h3>{location.name}</h3>
              <p>{location.address_1}</p>
              <p>{location.address_2}</p>
              <p>Zip: {location.zipcode}</p>
              <b><p>Recyclables: {location.accepted_recyclables}</p></b>
              <i><p>Contributed By: {location.created_by}</p></i>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No results found.</p>
            <button onClick={() => setFilteredLocations(locations)}>View All</button>
          </div>
        )}
      </div>
      {showSubmitWindow && (
        <div className="submit-location-container">
          <NewLocation onNewLocationSubmit={onNewLocationSubmit} onCancel={onCancelSubmit} />
        </div>
      )} <br/><br/><br/><br/>
    </div>
  )
}

export default Locate
