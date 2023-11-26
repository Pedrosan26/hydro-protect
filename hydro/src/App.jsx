// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sensor from './components/Sensor';
import Header from './components/Header';

function App() {
  const [sensors, setSensors] = useState([
    { nombre: "PH", valor: 0 },
    { nombre: "Reloj", valor: 0 }
  ]);

  useEffect(() => {
    const fetchSensorData = async () => {
      const phResponse = await axios.get('http://localhost:3100/api/getLogsPh/3');
      const timeResponse = await axios.get('http://localhost:3100/api/getLogsTime/4');
  
      setSensors(sensors => sensors.map(sensor => {
        if (sensor.nombre === 'PH' && phResponse.data && phResponse.data.ph) {
          return {...sensor, valor: phResponse.data.ph};
        } else if (sensor.nombre === 'Reloj' && timeResponse.data && timeResponse.data.time) {
          return {...sensor, valor: timeResponse.data.time};
        } else {
          return sensor;
        }
      }));
    };
  
    fetchSensorData();
  }, []);
  

  return (
    <div className='container mx-auto'>
      <Header/> 
      <div className='mt-12 md:flex justify-center space-x-24'>
        {sensors.map(sensor => <Sensor key={sensor.nombre} nombre={sensor.nombre} valor={sensor.valor}/>)}
      </div>
    </div>
  );
}

export default App;
