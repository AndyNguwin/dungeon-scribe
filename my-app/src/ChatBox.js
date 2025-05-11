import { useState } from 'react'

const ChatBox = () => {
    // useState for chatbox
    const [input, setInput] = useState('')

    // handles sending, sets chatbox to empty after sending
    const handleSend = () => {
        if (!input.trim()) return
        onSend(input)
        setInput('')
    }

    // takes paramater 'message' from input and can route to somewhere 
    const onSend = (message) => {
    console.log('User sent:', message)
  } 

    // calls send message when enter key is pressed
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend()
    }

  
  return (
    <div className="chat-input-area">
      <input
        type="text"
        className="chat-input"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="chat-send-button" onClick={handleSend}>
        Send
      </button>
    </div>
  )
}

export default ChatBox
