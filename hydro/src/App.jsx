import { useState } from 'react'

import './App.css'
import Sensor from './components/Sensor'
import Header from './components/Header'

function App() {
  const [nombre1, setNombre1] = useState("PH");
  const [valor1, setValor1] = useState(0);
  const [nombre2, setNombre2] = useState("Reloj");
  const [valor2, setValor2] = useState(0);

  return (
    <>

    <div className=' container mx-auto '>
    <Header/> 
    <div className='mt-12 md:flex justify-center space-x-24'>

    <Sensor nombre={nombre1} valor={valor1}/> 
    <Sensor nombre={nombre2} valor={valor2}/>
    </div>
    </div>


     
    </>
  )
}

export default App
