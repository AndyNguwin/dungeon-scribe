import './ChatBox.css';
import { useState } from 'react'
 
const ChatBox = ({ onSend }) => {
    const [input, setInput] = useState('')

    // handles sending, sets chatbox to empty after sending
    const handleSend = () => {
        if (!input.trim()) return
        onSend(input)
        setInput('')
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
        placeholder="Tell me tell me..."
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
