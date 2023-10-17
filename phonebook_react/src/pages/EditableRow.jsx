import React from 'react'

const EditableRow = () => {
  return (

    <tr>
        <td>
            <input type="text" required="required" placeholder='Enter a name...' name='fullName' />
        </td>

        <td>
            <input type="text" required="required" placeholder='Enter a phone number...' name='phoneNumber' />
        </td>
    </tr>

  )
}

export default EditableRow