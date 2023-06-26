import React from 'react'

const Button = ({className,children,onClick,...rest}) => {
  return (
    <div>
      <button
      className={`px-5 py-2 border border-white uppercase font-semibold tracking-wider leading-none overflow-hidden ${className}`} 
      onClick={(e) => onClick(e)} 
      {...rest}>
        {children}
        </button>
    </div>
  )
}

export default Button
