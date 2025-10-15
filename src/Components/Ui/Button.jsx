import React from 'react'

const Button = ({text , className }) => {
  return (
    <button className={`bg-purple-700 hover:scale-[0.97] cursor-pointer text-white py-2 px-2 rounded-md ${className} `}>{text}</button>
  )
}

export default Button
