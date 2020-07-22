import React from 'react'
import ReactTimeAgo from 'react-time-ago'

const dateFormat = require('dateformat');


const Issue = ({ issue, index, onDragStart, onDragOver, onDrop, onDragLeave, dragAndDrop }) => {
  const placeholderImg = "https://w5insight.com/wp-content/uploads/2014/07/placeholder-user-400x400-300x300.png"
  let createdAt = issue.created_at
  let updatedAt = dateFormat(issue.updated_at, "isoDateTime")
  return (
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
      <p><span>Updated </span><ReactTimeAgo date={updatedAt}/></p>
      <i className="fas fa-arrows-alt-v"></i>
    </li>
  )
}

export default Issue