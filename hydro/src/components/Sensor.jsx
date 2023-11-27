// Sensor.jsx
import React from 'react'

const Sensor = ({nombre, valor}) => {
  return (
    <div className='container md:w-1/4 ml-10 bg-sky-200 rounded-3xl shadow-md p-4 flex flex-col items-center'>
        <h2 className='text-xl font-bold mb-10'>{nombre}</h2> 
        <p className='text-2xl text-blue-500 mb-10'>{valor}</p>
        <button className='bg-cyan-700 text-white rounded px-4 py-2'>Ver Registro</button>
    </div>
  )
}

export default Sensor
