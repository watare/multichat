import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Multichat MVP</h2>
      <form onSubmit={sendMessage} style={{ marginBottom: 20 }}>
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
      <div>
        {(messages || []).map((msg, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{msg.username}:</b> {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
