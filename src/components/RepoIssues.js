import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
 
const dateFormat = require('dateformat');

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
 }
 
const RepoIssues = (props) => {
  const repo = localStorage.getItem("selectedRepo")
  const user = localStorage.getItem("user") 

   //initialize list to whatever is in LS 
  const [list, setList] = useState(JSON.parse(localStorage.getItem(`${repo}`)))
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
   
  const placeholderImg = "https://w5insight.com/wp-content/uploads/2014/07/placeholder-user-400x400-300x300.png"

  // onDragStart fires when an element starts being dragged
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
   
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list
    });
    
    // for Firefox.
    event.dataTransfer.setData("text/html", '');
  }
  
  // onDragOver fires when an element being dragged enters a droppable area.
  const onDragOver = (event) => {
    event.preventDefault()
    
    let newList = dragAndDrop.originalOrder
    
    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom
  
    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position)
  
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom)
  
      newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
      ];
     
    if (draggedTo !== dragAndDrop.draggedTo){
      setDragAndDrop({
      ...dragAndDrop,
      updatedOrder: newList,
      draggedTo: draggedTo
      })
    }
  }
  
  //update LS and list everytime the order changes
  const onDrop = (event) => {
    localStorage.setItem(`${repo}`, JSON.stringify(dragAndDrop.updatedOrder))
    setList(dragAndDrop.updatedOrder);
   
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    })
  }
 
  const onDragLeave = () => {
    setDragAndDrop({
    ...dragAndDrop,
    draggedTo: null
   });
  }
  
  //makes a call everytime the selected repo changes IF it already doesn't exist in LS
  useEffect(() => {
    let isCurrent = true
    if(localStorage.getItem(`${repo}`) == null) {
      axios.get(`https://api.github.com/repos/${user}/${repo}/issues`)
      .then((res) => {
        if(isCurrent){
          setList(res.data)  
        }
      })
      .catch((error) => {
        setList(null)
        // setIssueError(error.response.status)
      })
    }
    return() => {
      isCurrent = false
    }
  }, [props.repoName])
  
  //update list with whatever is in LS when the repo in LS updates with a new order
  useEffect( ()=>{
    setList(JSON.parse(localStorage.getItem(`${repo}`)))
   }, [repo])

  return(
    <section>
      <ol>
      {list && list.map( (issue, index) => {
        let createdAt = issue.created_at
        return(
          <li
            style={{background: "pink"}}
            key={index}
            data-position={index}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragLeave={onDragLeave}
            className={dragAndDrop && dragAndDrop.draggedTo=== Number(index) ? "dropArea" : ""}
            >
            <p>{issue.assignees.length > 0 ? 'Assignees' : 'No one assigned'}</p>
              {issue.assignees.length > 0 ? issue.assignees.map((assignee, index) => (
                <img src={assignee.avatar_url} key={index} height="40px" alt="github user" />
                )) : (
                <img src={placeholderImg} height="40px" alt="github user" />
                )}         
            <p>{issue.title}</p>
            <p><span>Created </span>{dateFormat(createdAt, "shortDate")}</p>
            <p><span>Updated </span><ReactTimeAgo date={issue.updated_at}/></p>
            <i class="fas fa-arrows-alt-v"></i>
            </li>
        )
      })}
      </ol>
    </section>
  )
 }

 export default RepoIssues