import './ChatBox.css';
import { useState } from 'react'

import axios from 'axios' 
 
const ChatBox = ({onResponse}) => {
    const [input, setInput] = useState('')
    
    // handles sending, sets chatbox to empty after sending
    const handleSend = () => {
        if (!input.trim()) return
        onSend(input)
        setInput('')
    }
    
    const onSend = async (input) => {
      try {
        axios.post("https://sr1sgbqa1h.execute-api.us-west-2.amazonaws.com/roleplay-notes", {
          "user_prompt" : input}, {header: {"Content-Type": "application/json" }})
        .then(function (response) {
          const formatted_responses = Object.entries(response).map(([category, traits]) => ({
            title: category.replace(/_/g, ' ').toUpperCase(), // e.g. CORE_TRAITS
            items: traits // each item is [summary, explanation]
          }));
  
          // setResponses(formatted_responses)
          console.log(JSON.stringify(formatted_responses, null, 2));
          // console.log(JSON.stringify(responses, null, 2));
  
          // console.log(response);
          console.log(formatted_responses);
          onResponse(formatted_responses)
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data)
          }
        })
  
        // setResponses(messages)
      } catch (error) {
        console.error('Error:', error);
      }
    };

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
