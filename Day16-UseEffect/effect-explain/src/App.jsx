import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [hambre, setHambre] = useState(0);
  const [mensaje, setMensaje] = useState('😺 Miau! Hola humano.');
  const [activo, setActivo] = useState(true);

  // 1️⃣ useEffect sin dependencias: se ejecuta en cada render
  useEffect(() => {
    console.log('🔁 El gato ha sido renderizado.');
  });

  // 2️⃣ useEffect con array vacío: solo una vez al montar
  useEffect(() => {
    console.log('🐾 El gato ha aparecido en pantalla.');
    setMensaje('😺 El gato está listo para jugar.');

    // Limpieza opcional
    return () => {
      console.log('💨 El gato se ha ido a dormir.');
    };
  }, []);

  // 3️⃣ useEffect con dependencia: cuando cambia el hambre
  useEffect(() => {
    if (hambre >= 5) {
      setMensaje('😾 ¡Tengo hambre! Dame comida.');
    } else if (hambre === 0) {
      setMensaje('😺 Gracias por la comida, humano.');
    } else {
      setMensaje(`😼 Nivel de hambre: ${hambre}`);
    }
  }, [hambre]);

  // Simula que el gato se va dando hambre con el tiempo
  useEffect(() => {
    if (!activo) return;

    const intervalo = setInterval(() => {
      setHambre(prev => Math.min(prev + 1, 5));
    }, 3000);

    return () => clearInterval(intervalo); // cleanup
  }, [activo]);

  const alimentar = () => {
    setHambre(0);
  };

  const dormir = () => {
    setActivo(false);
    setMensaje('💤 El gato está dormido...');
  };

  const despertar = () => {
    setActivo(true);
    setMensaje('☀️ El gato se ha despertado con energía.');
  };

  return (
    <div>
      <h1>{mensaje}</h1>
      <p>Estado de hambre: {hambre}</p>
      <button onClick={alimentar}>🍖 Alimentar</button>
      <button onClick={dormir}>😴 Dormir</button>
      <button onClick={despertar}>🌞 Despertar</button>
    </div>
  );
}

export default App
