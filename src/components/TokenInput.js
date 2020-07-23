import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'

import Button from "./Button"

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
    <div className="tokenContainer">
      <div className="tokenWrapper">
        <h1>ROUTABLE ISSUE PRIORITIZATION TOOL</h1>
        <p>Please provide your Github API key to continue</p>
        <a href="https://github.com/settings/tokens" target="_blank">generate a new token</a>
        <div className="tokenInputWrapper">
          <input 
            type="text"
            value={githubKey}
            placeholder="5f1d5259fceaf6087569f9017f372873d044ee23" 
            onChange={(e) => dispatch({type: "SET_KEY", payload: e.target.value})} />
          <Button onClick={handleAuthenticate} continue={true}>CONTINUE</Button>
          
          {error && <p>There was an error, please try again</p>}
          {authenticated && <Redirect to={{pathname:"/repos", state: {githubKey} }}  /> }
        </div>
      </div>
    </div>
  )
}
export default TokenInput