import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const socket = io("/")

function App(){

  const[message, setMessage] = useState('');
  const[messages, setMessages] = useState([]);

  const handleSumbit =(e)=>{
    e.preventDefault()

    const newMessage={
      body: message,
      from: 'Me'
    }

    setMessages([...messages,newMessage])
    socket.emit('message', message)

  }
  useEffect(()=>{
    socket.on('message', receiveMessage);

    return()=>{
      socket.off('message', receiveMessage);
    }

  },[])

  const receiveMessage = (message) => 
  setMessages((state)=>[...state, message]);
  return(
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center ">
      <form action="" onSubmit={handleSumbit} className='bg-zinc-900 p-10'>
      <ul>
        {
          messages.map((message, i)=>(
            <li key={i} className={
              `my-2 p-2 table text-sm rounded-md ${message.from==='Me'?'bg-sky-700':`bg-black ml-auto`}`
            }>
              <span className='text-xs text-slate-300 block'>
                {message.from}
                </span>
                <span className='text-sm'>
                  {message.body}
                  </span>
            </li>
          ))
        }
      </ul>
        <input type="text" placeholder='Escribe un mensaje'
        onChange={(e)=> setMessage(e.target.value)} className='border-2 border-zinc-500 p-2 w-full text-black' />
        <button>Enviar</button>
      </form>
    </div>
  )
}

export default App