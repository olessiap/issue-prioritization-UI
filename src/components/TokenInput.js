import React from 'react'
import { NavLink} from 'react-router-dom'

function TokenInput() {
  return (
    <>
      <p>Please provide your Github API key to continue</p>
      <input type="text" />
      <NavLink to="/repos">CONTINUE</NavLink>
    </>
  )
}

export default TokenInput