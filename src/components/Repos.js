import React, { useState, useEffect } from 'react'
import RepoIssues from './RepoIssues'
import axios from 'axios'
import { useDispatch } from "react-redux"

function Repos(props) {
  const [ repos, setRepos ] = useState(null)
  const [ selectedRepo, setSelectedRepo] = useState(null)
  //initialize active repo class to null OR whatever id is in LS
  const [ activeId, setActiveId ] = useState(localStorage.getItem("expandedRepoId") !== null ? JSON.parse(localStorage.getItem("expandedRepoId")) : null)
  
  const dispatch = useDispatch()
  // const githubKey = props.location.state.githubKey
  const userName = localStorage.getItem("user")

  //call repos on each rerender
  useEffect(() => { 
    axios.get(`https://api.github.com/users/${userName}/repos`,{
      // headers: {
      //   'Authorization': `token ${githubKey}`
      // }
    })
    .then((res) => {
        setRepos(res.data)
    })
    .catch((error) => {
      dispatch({type: "ERROR", payload:error})
    })
  }, [])

  return(
    <div className="mainContainer">
      <section>
        <div className={activeId !== null ? "expandedView" : "defaultView"}>
          <ul>
          <h1 style={{paddingTop: '0.3em'}}>repositories</h1>
            {repos && repos.map((repo, index) => (
              <li
                key={index}
                className={`repoListItem ${index === activeId ? "activeButton" : ''}`}
                onClick={() => {
                  setSelectedRepo(repo.name)
                  setActiveId(index)
                  localStorage.setItem("expandedRepoId", index)
                  localStorage.setItem("selectedRepo", repo.name)
                }}
              >
                {repo.name}
              </li>
              )
              )}
          </ul>
        {activeId !== null && <RepoIssues repoName={selectedRepo}/>}
        </div>
      </section>
    </div>
  )
}

export default Repos