import React from 'react'
import Logo from '../public/Logo.jpg'

const Header = () => {
  return (
    <header className=" bg-sky-800 text-white ">

        <div className='w-28 h-28'> 
          <img src={Logo} alt="Logo" className='object-contain w-full h-full' />
        </div>

        <div className='text-center font-black text-3xl'>
        <h1> HYDRO PROTECT </h1>
        <p>Cuidando {' '}
        <span className=' text-lg text-red-600'>  el Agua desde casa </span> </p>
        </div>


        <div className='mt-5 text-center rounded-lg bg-slate-800 text-white p-6 flex justify-center '>
            <button className=' mx-10 py-2 px-4 rounded-2xl  bg-white text-blue-500'> Home </button>
            <button className=' mx-10 py-2 px-4 rounded-2xl bg-white text-blue-500'> Sensores</button>
            <button className=' mx-10 py-2 px-4 rounded-2xl bg-white text-blue-500'> Inicia Sesion</button>        
        </div>

    </header>
  )
}

export default Header
