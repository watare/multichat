import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content }]);
    try {
      const res = await axios.post('/api/llm_chat', {
        prompt: content,
        model: 'gpt-4',
        temperature: 0.7
      });
      // Adaptation à la structure de réponse de l'API
      const aiMsg = res.data.choices?.[0]?.message?.content || res.data.reply || JSON.stringify(res.data);
      setMessages(prev => [...prev, { role: 'ai', content: aiMsg }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Erreur IA" }]);
    }
    setContent('');
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Chat IA</h2>
      <form onSubmit={sendMessage} style={{ marginBottom: 20, display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Votre message"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          style={{ flex: 1 }}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Envoyer</button>
      </form>
      <div style={{ background: '#fafafa', borderRadius: 8, padding: 10, minHeight: 100 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 10, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{ color: msg.role === 'user' ? '#007bff' : '#222' }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <div style={{ color: '#888' }}>Réponse IA en cours...</div>}
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content }]);
    try {
      const res = await axios.post('/api/llm_chat', {
        prompt: content,
        model: 'gpt-4',
        temperature: 0.7
      });
      // Adaptation à la structure de réponse de l'API
      const aiMsg = res.data.choices?.[0]?.message?.content || res.data.reply || JSON.stringify(res.data);
      setMessages(prev => [...prev, { role: 'ai', content: aiMsg }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Erreur IA" }]);
    }
    setContent('');
    setLoading(false);
  };

  return (
<<<<<<< HEAD
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
=======
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Chat IA</h2>
      <form onSubmit={sendMessage} style={{ marginBottom: 20, display: 'flex', gap: 8 }}>
>>>>>>> dc60ee5 (test api)
        <input
          type="text"
          placeholder="Votre message"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          style={{ flex: 1 }}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Envoyer</button>
      </form>
<<<<<<< HEAD
=======
      <div style={{ background: '#fafafa', borderRadius: 8, padding: 10, minHeight: 100 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 10, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{ color: msg.role === 'user' ? '#007bff' : '#222' }}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <div style={{ color: '#888' }}>Réponse IA en cours...</div>}
      </div>
>>>>>>> dc60ee5 (test api)
    </div>
  );
}

export default App;
