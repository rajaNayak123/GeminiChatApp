import socket from 'socket.io-client'

let socketInstance = null; // represents the connection between server and client

export const initializeSocket = (projectId) => {

    // console.log(projectId);
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
    if(!socketInstance){
        console.error("Socket not initialized");
        return;
    }
    socketInstance.on(eventName, (data) => {
        console.log("📥 Received:", data);
        cb(data);
    });
    // socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) =>{
    if (!socketInstance) {
        console.error("Socket not initialized");
        return;
    }
    socketInstance.emit(eventName, data);
}