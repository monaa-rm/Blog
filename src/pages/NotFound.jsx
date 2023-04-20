import React from 'react'
import error404 from "../../public/images/404.jpg"
const NotFound = () => {
  return (
    <div className='h-screen'>
      <img src={error404} alt='404' className='w-full md:h-full' />
    </div>
  )
}

export default NotFound
