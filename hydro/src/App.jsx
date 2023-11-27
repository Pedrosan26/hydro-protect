// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sensor from './components/Sensor';
import Header from './components/Header';

function App() {
  const [sensors, setSensors] = useState([
    { nombre: "PH", valor: 0 },
    { nombre: "Reloj", valor: 0.0 },
    {nombre: "Flujo", valor: 0.0},
    {nombre:"Cantidad de Agua", valor:0.0 }
  ]);


  useEffect(() => {
    const fetchSensorData = async () => {
      const phResponse = await axios.get('http://localhost:3100/api/getLogsPh/3');
      const timeResponse = await axios.get('http://localhost:3100/api/getLogsTime/4');
      const flujoResponese= await axios.get('http://localhost:3100/api/getLogsFlujo/2');
      const ultraSonico= await axios.get('http://localhost:3100/api/getLogsUltraSonico/6');
  
      setSensors(sensors => sensors.map(sensor => {
        if (sensor.nombre === 'PH' && phResponse.data.data && phResponse.data.data.length > 0) {
          const lastPhLog = phResponse.data.data[phResponse.data.data.length - 1];
          return {...sensor, valor: lastPhLog.ph};
        } else if (sensor.nombre === 'Reloj' && timeResponse.data.data && timeResponse.data.data.length > 0) {
          const lastTimeLog = timeResponse.data.data[timeResponse.data.data.length - 1];
          return {...sensor, valor: lastTimeLog.time};
        } else if (sensor.nombre === 'Flujo' && timeResponse.data.data && timeResponse.data.data.length > 0) {
          const lastTimeLog = timeResponse.data.data[timeResponse.data.data.length - 1];
          return {...sensor, valor: lastTimeLog.flujo};
        }else if (sensor.nombre === 'Cantidad de Agua' && timeResponse.data.data && timeResponse.data.data.length > 0) {
          const lastTimeLog = timeResponse.data.data[timeResponse.data.data.length - 1];
          return {...sensor, valor: lastTimeLog.dist_cm};
        }
          else {
          return sensor;
        }
      }));
    };
  
    // Llama a fetchSensorData inmediatamente después de que el componente se monte
    fetchSensorData();
  
    // Configura un intervalo para llamar a fetchSensorData cada 5 segundos
    const intervalId = setInterval(fetchSensorData, 1000);
  
    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
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
