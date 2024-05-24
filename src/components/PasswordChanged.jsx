import React from 'react'
import { Link } from 'react-router-dom'

export default function PasswordChanged() {
  return (
    <div>your password have been changed<br /> <Link className='text-blue-400' to={"/user"}>go to login page</Link></div>
  )
}
