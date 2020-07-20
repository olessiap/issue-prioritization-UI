import React, { useState } from 'react'
import RepoIssues from './RepoIssues'
import uuid from "react-uuid"

const repoList = () => {
  return (
    {id:uuid(), name:"Cool Repo Title"}
  )
}
function Repos() {
  const [ expandIssues, setExpandIssues ] = useState(false)
  const [ selectedRepoId, setSelectedRepoId ] = useState(null)

  return(
    <div>
      <h2>REPOS</h2>
      <div style={{display: expandIssues ? 'flex' : 'block'}}>
        <div>
          {Array.from({length: 5}, () => repoList()).map(
            repo => {
              return (
                <>
                <div 
                  style={{border:'1px solid black', padding:'1em', display:'flex'}}
                  onClick={() => {
                    setExpandIssues(true)
                    setSelectedRepoId(repo.id)
                  }}
                >
                {repo.name}
                </div>
                </>
              )
            }
            )}
        </div>
      {expandIssues && <RepoIssues id={selectedRepoId}/>}
      </div>
    </div>
  )
}

export default Repos