import React from 'react'
import { useFormik } from 'formik'

const NewLocation = ({ onSubmit, onCancel }) => {
  const initialValues = {
    name: '',
    address1: '',
    address2: '',
    recyclables: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <div className="submit-location-form">
      <h2>Add New Location</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <label htmlFor="address1">Address 1</label>
        <input
          type="text"
          id="address1"
          name="address1"
          value={formik.values.address1}
          onChange={formik.handleChange}
        />

        <label htmlFor="address2">Address 2</label>
        <input
          type="text"
          id="address2"
          name="address2"
          value={formik.values.address2}
          onChange={formik.handleChange}
        />

        <label htmlFor="recyclables">Accepted Recyclables</label>
        <input
          type="text"
          id="recyclables"NewLocation
          name="recyclables"
          value={formik.values.recyclables}
          onChange={formik.handleChange}
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default NewLocation