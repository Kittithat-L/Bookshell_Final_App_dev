import React from 'react'
import Book_ico from '../Assests/Icon/ion_book-outline.png'

const Logo = () => {
  return (
    <div className=' flex min-w-screen text-center justify-center'>
        <div className=' absolute top-1/8'><img src={Book_ico} alt='ion_book-outline' /></div>
        <div className=' text-white text-center text-5xl font-bold absolute top-1/8 mt-15'>BOOKSHELL</div>
    </div>
  )
}

export default Logo