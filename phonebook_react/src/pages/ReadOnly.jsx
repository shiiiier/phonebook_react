import React from 'react'

const ReadOnly = ({ user }) => {
  return (

    <tr>
        <td>{user.name}</td>
        <td>{user.phoneNumber}</td>
    </tr>

  )
}

export default ReadOnly