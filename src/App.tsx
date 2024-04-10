
import { useEffect, useRef, useState } from 'react'
import './App.css'
import Chat from './components/chat'
import FormMessage from './components/form-message'

function App() {
  const [messages, setMessages] = useState<any[]>([])
  const [value, setValue] = useState("")
  const [connected, setConnected] = useState(false)
  const [username, setUserName] = useState("")
  const socket = useRef<any>(null)

  function connectedSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    connect()
  }

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000")
    socket.current.onopen = () => {
      setConnected(true)
      const message = {
        event: "connection",
        username,
        id: Date.now()
      }
      socket.current.send(JSON.stringify(message))
    }
    socket.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
    }
    socket.current.onclose = () => {

    }
    socket.current.onerror = () => {

    }
  }
  console.log(messages)
  async function sendMessage() {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message"
    }
    socket.current.send(JSON.stringify(message));
    setValue("")
  }
  function messageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    sendMessage();
  }
  if (!connected) {
    return (
      <div>
        <form onSubmit={connectedSubmit}>
          <input value={username} onChange={e => setUserName(e.target.value)} type="text" placeholder='Введите имя пользователя' />
          <input type="submit" />
        </form>
      </div>
    )
  }
  return (
    <Chat>
      <h1>Чат</h1>
      <div className='ListContainer'>
        {messages.map(item => {
          return <div key={item.id}>{
            item.event === "connection" ?
              <div>{`Пользователь ${item.username} подключился`}</div> :
              <div>{item.username} {item.message}</div>
          }</div>
        })}
      </div>
      <FormMessage cb={sendMessage} />

    </Chat>


  )
}

export default App
