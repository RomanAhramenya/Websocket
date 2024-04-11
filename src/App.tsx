
import { useCallback, useRef, useState } from 'react'
import './App.css'
import Chat from './components/chat'
import FormMessage from './components/form-message'
import List from './components/list'
import Item from './components/item'

function App() {
  const [messages, setMessages] = useState<any[]>([])
  const [connected, setConnected] = useState(false)
  const [username, setUserName] = useState("")
  const socket = useRef<any>(null)



  function connect(username: string) {
    socket.current = new WebSocket("ws://localhost:5000")
    socket.current.onopen = () => {
      setConnected(true)
      setUserName(username)
      const message = {
        event: "connection",
        username,
        id: Date.now()
      }
      socket.current.send(JSON.stringify(message))
    }
    socket.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data)
      if (message.event === "message") {
        setMessages(prev => [...prev, message])
      }

    }
    socket.current.onclose = () => {

    }
    socket.current.onerror = () => {

    }
  }
  async function sendMessage(value: string) {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message"
    }
    socket.current.send(JSON.stringify(message));
  }
  const renderItem = useCallback((item: any) => {
    return <Item key={item.id} text={item.message} pos={item.username === username ? "right" : "left"} />
  }, [messages])

  return (
    <Chat>
      {!connected ? <FormMessage cb={connect} placeholder="Ваше имя" /> : <>
        <List list={messages} renderItem={renderItem} />
        <FormMessage cb={sendMessage} placeholder="Сообщение" />
      </>}

    </Chat>


  )
}

export default App
