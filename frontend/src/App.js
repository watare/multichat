import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('/api/messages').then(res => {
      if (Array.isArray(res.data)) {
        setMessages(res.data);
      } else {
        setMessages([]);
      }
    });
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post('/api/messages', { username, content });
    setContent('');
    axios.get('/api/messages').then(res => {
      if (Array.isArray(res.data)) {
        setMessages(res.data);
      } else {
        setMessages([]);
      }
    });
  };

  return (
    <div className="chat-container">
      <h2 className="title">Multichat MVP</h2>
      <div className="messages">
        {(messages || []).map((msg, i) => (
          <div key={i} className="message">
            <b>{msg.username}:</b> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="input-area">
        <input
          type="text"
          placeholder="Votre nom"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;
