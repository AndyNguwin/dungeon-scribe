const Message = ({ text, sender }) => {
  const isUser = sender === 'user'
  return (
    <div className={`message-row ${isUser ? 'user' : 'bot'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        {text}
      </div>
    </div>
  )
}

export default Message
