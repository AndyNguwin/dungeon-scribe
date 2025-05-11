import './ChatBox.css';
import { useState } from 'react'

import axios from 'axios' 
 
const LoreChatBox = ( ) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
      {
        "role":"system",
        "content":"You are a DnD roleplay assistant who helps users create immersive backstories for their characters. Do not create a backstory for the user unless asked to. Please provide guidance and direction based on the user input of what kind of character they want. Please help the user think of what kind of character they can make if they don't know where to start. Provide suggestions in a clear and concise manner that is easy to read. Always end the message by asking if anything needs to be clarified or encouraging the user to tell you what new information they decide on. Also provide the option to summarize and rephrase the character based on the conversation and what the user wanted from past messages. If the input is unclear, irrelevant, or nonsensical, or if the user asks for something you don't know, prompt them to ask again. Do not explain or apologize. Ask for them to ask again."
      }
    ])
    const [responses, setResponses] = useState([])
    
    // handles sending, sets chatbox to empty after sending
    const handleSend = () => {
        if (!input.trim()) return
        onSend(input)
        setInput('')
    }
    
    const onSend = async (input) => {
      const newMessage = {
        "role":"user",
        "content":input
      };
      setMessages(prev => [...prev, newMessage])
      try {
        axios.post("https://qke3mc2qmi.execute-api.us-west-2.amazonaws.com/lore-notes", {
          "user_prompt" : input}, {header: {"Content-Type": "application/json" }})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
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

export default LoreChatBox
