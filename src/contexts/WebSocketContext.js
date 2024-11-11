import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto para WebSocket
const WebSocketContext = createContext();

// Proveedor del contexto WebSocket
export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [dataEvent,setDataEvent]=useState('');
  // Función para crear la conexión
  const createWebSocketConnection = (identifier) => {
    const newSocket = new WebSocket(`wss://payments.pre-bnvo.com/ws/merchant/${identifier}`);
    newSocket.onopen = () => {
      console.log('Conexión WebSocket abierta');
      setStatusMessage('Conexión establecida');
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDataEvent(data)
      console.log("Mensaje recibido:", data);
    };

    newSocket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      setStatusMessage('Error en la conexión');
    };

    newSocket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
      setStatusMessage('Conexión cerrada');
    };

    setSocket(newSocket);
  };

  // Limpiar la conexión cuando el componente se desmonte
  const closeConnection = () => {
    if (socket) {
      socket.close();
    }
  };

  const removeListeners = () => {
    if (socket) {
      socket.onopen = null;        // Eliminar listener onopen
      socket.onmessage = null;     // Eliminar listener onmessage
      socket.onerror = null;       // Eliminar listener onerror
      socket.onclose = null;       // Eliminar listener onclose
      socket.close();              // Cerrar la conexión
      setDataEvent('')
      setSocket(null);             // Limpiar el estado del socket
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket,dataEvent,statusMessage, createWebSocketConnection,removeListeners,closeConnection }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook para acceder al WebSocket en cualquier componente
export const useWebSocket = () => useContext(WebSocketContext);
