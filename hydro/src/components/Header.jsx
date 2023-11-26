import React from 'react'

const Header = () => {
  return (
    <header>

        <div className=' text-left ml-4 mt-4 '> 
        <p> AQUi va la imagen
        </p>
        </div>

        <div className=' text-center font-black text-3xl'>
        <h1> HYDRO PROTECT </h1>
        <p>Cuidando {' '}
        <span className=' text-lg text-red-950'>  el Agua desde casa </span> </p>
        </div>


        <div className='mt-5 text-center rounded-lg bg-slate-500 text-white p-6'>
            <button className=' mr-10'> Home </button>{''} <button className=' mr-10'> Sensores</button>  {" "} <button> Inicia Sesion</button>        
        </div>

    </header>
  )
}

export default Header