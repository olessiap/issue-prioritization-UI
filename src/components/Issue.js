import React from 'react'
import ReactTimeAgo from 'react-time-ago'

const dateFormat = require('dateformat');

const Issue = ({ issue, repo, index, onDragStart, onDragOver, onDrop, onDragLeave, dragAndDrop }) => {
  const placeholderImg = "https://w5insight.com/wp-content/uploads/2014/07/placeholder-user-400x400-300x300.png"
  let createdAt = issue.created_at
  let updatedAt = dateFormat(issue.updated_at, "isoDateTime")
  return (
    <li
      key={index}
      data-position={index}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      className={dragAndDrop && dragAndDrop.draggedTo=== Number(index) ? "dropArea" : ""}
      >
      <div className="issue-number">{index+1}</div>
      <div className="issue-details-wrapper">
        <div className="avatar-title-wrapper">
          {issue.assignees.length > 0 ? issue.assignees.map((assignee, index) => (
            <img src={assignee.avatar_url} key={index} height="40px" alt="github user" />
            )) : (
            <img src={placeholderImg} height="40px" alt="github user" />
            )}         
          <div className="issue-title-wrapper">
            <p className="repo-name">{repo}</p>
            <p className="issue-title">{issue.title}</p>
          </div>
        </div>
        <div className="dates-wrapper">
          <p>Created {dateFormat(createdAt, "shortDate")}</p>
          <p>Updated {<ReactTimeAgo date={updatedAt}/>}</p>
        </div>
      </div>
    </li>
  )
}

export default Issue