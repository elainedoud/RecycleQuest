import React from 'react'
import { useFormik } from 'formik'
import './NewLocation.css'

const NewLocation = ({ onCancel, filteredLocations }) => {
  const initialValues = {
    name: '',
    address1: '',
    address2: '',
    recyclables: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      values.created_by = 0
      const updatedLocations = {filteredLocations, values}
      console.log(updatedLocations)
      // setLocations(updatedLocations)
      // setFilteredLocations(updatedLocations)
      // onNewLocationSubmit()
    },
  })

  return (
    <div className="submit-location-window">
      <h2 className='add-location'>ADD FACILITY</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* <label htmlFor="name">Name</label> */}
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Facility Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        /> <br/>

        {/* <label htmlFor="address1">Address 1</label> */}
        <input
          type="text"
          id="address1"
          name="address1"
          placeholder="Address 1"
          value={formik.values.address1}
          onChange={formik.handleChange}
        /> <br/>

        {/* <label htmlFor="address2">Address 2</label> */}
        <input
          type="text"
          id="address2"
          name="address2"
          placeholder="Address 2"
          value={formik.values.address2}
          onChange={formik.handleChange}
        /> <br/>

        {/* <label htmlFor="recyclables">Accepted Recyclables</label> */}
        <input
          type="text"
          id="recyclables"
          name="recyclables"
          placeholder="Accepted Recyclables"
          value={formik.values.recyclables}
          onChange={formik.handleChange}
        /> <br/> <br/>

        <button className="add-facility" type="submit">Submit</button>
        <button className="add-facility" type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default NewLocation