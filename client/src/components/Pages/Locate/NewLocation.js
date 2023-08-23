import React, {useContext} from 'react'
import { useFormik } from 'formik'
import './NewLocation.css'
import UserContext from '../../Context/UserContext'

const NewLocation = ({ onCancel, onNewLocationSubmit }) => {
  const {user, updatePoints} = useContext(UserContext)

  const initialValues = {
    name: '',
    address_1: '',
    address_2: '',
    accepted_recyclables: '',
    zipcode: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      values.created_by = 'isabella_mercer' // Change to the appropriate user
    
      fetch('/newlocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            console.error('Error adding new location')
          }
        })
        .then(newLocation => {
          if (newLocation) {
            onNewLocationSubmit(newLocation)
            updatePoints("recycle_redemption", 10)
             // Update parent component's location state
          }
        })
        .catch(error => {
          console.error('Error:', error)
        })
    },
  })

  return (
    <div className="submit-location-window">
      <h2 className='add-location'>ADD FACILITY</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          className="new-location"
          type="text"
          id="name"
          name="name"
          placeholder="Facility Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        /> <br/>

        <input
          className="new-location"
          type="text"
          id="address_1"
          name="address_1"
          placeholder="Address 1"
          value={formik.values.address_1}
          onChange={formik.handleChange}
        /> <br/>

        <input
          className="new-location"
          type="text"
          id="address_2"
          name="address_2"
          placeholder="Address 2"
          value={formik.values.address_2}
          onChange={formik.handleChange}
        /> <br/>

        <input  
          className="new-location"
          type="text"
          id="recyclables"
          name="accepted_recyclables"
          placeholder="Accepted Recyclables"
          value={formik.values.accepted_recyclables}
          onChange={formik.handleChange}
        /> <br/>

        <input
          className="new-location"
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="Zip Code"
          value={formik.values.zipcode}
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