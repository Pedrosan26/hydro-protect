import React from 'react'
import Logo from '../public/Logo.jpg'

const Header = () => {
  return (
    <header className=" bg-sky-800 text-white flex">

        <div className=' h-32 w-32 '> 
          <img src={Logo} alt="Logo" className='object-contain h-full w-full' />
        </div>

        <div className='text-center font-black text-3xl mx-auto'>
        <h1 className=' mt-5 ml-5'> HYDRO PROTECT </h1>
        <p>Cuidando {' '}
        <span className=' text-lg text-red-600'>  el Agua desde casa </span> </p>
        </div>


        <div className='mt-5 text-center rounded-lg bg-sky-800 text-white p-6 flex justify-center '>
            <button className=' mx-10 py-2 px-4 rounded-2xl  bg-white text-blue-500'> Home </button>
            <button className=' mx-10 py-2 px-4 rounded-2xl bg-white text-blue-500'> Sensores</button>
            <button className=' mx-10 py-2 px-4 rounded-2xl bg-white text-blue-500'> Inicia Sesion</button>        
        </div>

    </header>
  )
}

export default Header
