import socket from 'socket.io-client'

let socketInstance = null; // represents the connection between server and client

export const initializeSocket = (projectId) => {
    socketInstance = socket(import.meta.env.VITE_BASE_URL,{
        // for authentication
        auth:{
            token: localStorage.getItem('token'),
        },
        query:{
            projectId
        }
    })

    return socketInstance
}

export const receiveMessage = (eventName, cb) =>{
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) =>{
    socketInstance.emit(eventName, data);
}