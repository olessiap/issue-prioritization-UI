import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from "react-redux"

function TokenInput() {
  const [ authenticated, setAuthenticated ] = useState(false)
  const githubKey = useSelector(state => state.githubKey);
  const dispatch = useDispatch();

  return (
    <>
      <p>Please provide your Github API key to continue</p>
      <input type="text" onChange={(e) => dispatch({type: "SET_KEY", payload: e.target.value})} />
        <button onClick={() =>  setAuthenticated(true)}>
          CONTINUE
        </button>
      {authenticated && <Redirect to={"/repos"} /> }
    </>
  )
}
export default TokenInput