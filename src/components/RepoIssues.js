import React, { useEffect, useState } from 'react'

function RepoIssues(props) {
  console.log(props.id)
  //make request with repo Id and return a list of issues
  return (
    <div>
      <h3>Issues for id:</h3>
      <div>{props.id}</div>
    </div>
  )

}
export default RepoIssues