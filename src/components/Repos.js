import React, { useState, useEffect } from 'react'
import RepoIssues from './RepoIssues'
import axios from 'axios'
import { useDispatch } from "react-redux"

function Repos(props) {
  const expandedView = localStorage.getItem("expandedView") === 'true' ? true : false 
  const [ expandIssues, setExpandIssues ] = useState(expandedView)
  const [ repos, setRepos ] = useState(null)
  const [ selectedRepo, setSelectedRepo] = useState(null)
  
  const dispatch = useDispatch()
  const githubKey = props.location.state.githubKey

  useEffect(() => { 
    axios.get(`https://api.github.com/user/repos`,{
      headers: {
        'Authorization': `token ${githubKey}`
      }
    })
    .then((res) => {
        setRepos(res.data)
    })
    .catch((error) => {
      dispatch({type: "ERROR", payload:error})
    })
  }, [])

  return(
    <div>
      <h2>REPOS</h2>
      <div style={{display: expandIssues ? 'flex' : 'block'}}>
        <div>
          {repos && repos.map((repo, index) => (
            <div 
              key={index}
              style={{border:'1px solid black', padding:'1em', display:'flex'}}
              onClick={() => {
                setExpandIssues(true)
                setSelectedRepo(repo.name)
                localStorage.setItem("expandedView", true)
                localStorage.setItem("selectedRepo", repo.name)
              }}
            >
              {repo.name}
            </div>
            )
          )}
        </div>
      {expandIssues && <RepoIssues repoName={selectedRepo}/>}
      </div>
    </div>
  )
}

export default Repos