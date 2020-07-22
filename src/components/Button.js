import React from 'react'

const Button = ({children, ...props}) => {
  return (
    <button {...props} className={props.continue ? "continueButton" : "defaultButton"}>{children}</button>
  )
}

export default Button