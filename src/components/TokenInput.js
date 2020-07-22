import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'


function TokenInput() {
  const [ authenticated, setAuthenticated ] = useState(false)
  const githubKey = useSelector(state => state.githubKey)
  const error = useSelector(state => state.error)
  const dispatch = useDispatch();

  const handleAuthenticate = () => {
    axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${githubKey}`
      }
    })
    .then((res) => {
        dispatch({type: "RESOLVED", payload:res.data})
        setAuthenticated(true)
    })
    .catch((error) => {
      dispatch({type: "ERROR", payload:error})
    })
  }
  return (
    <>
      <p>Please provide your Github API key to continue</p>
      <input type="text" onChange={(e) => dispatch({type: "SET_KEY", payload: e.target.value})} />
        <button onClick={handleAuthenticate}>
          CONTINUE
        </button>
      {error && <p>There was an error, please try again</p>}
      {authenticated && <Redirect to={{pathname:"/repos", state: {githubKey} }}  /> }
    </>
  )
}
export default TokenInput