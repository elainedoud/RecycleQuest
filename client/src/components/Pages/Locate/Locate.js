
import React from 'react'
import { useFormik } from 'formik'
import './Locate.css'

const Locate = () => {
  const initialValues = {
    name: '',
    location: '',
  }

  const onSubmit = (values) => {
    // Handle form submission here
    console.log(values)
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <div>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Search by location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
          <button type="submit" onClick={formik.handleSubmit}>
            Search
          </button>
        </div>
      </div>
      <div className="card-container">
        {/* Cards will be dynamically added here */}
      </div>
    </div>
  )
}

export default Locate