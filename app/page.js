'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
let socket;

export default function Home() {
  const [username, setUsername] = useState();
  const [message, setMessage] = useState();
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    await fetch('/api/socket');
    socket = io();
    socket.on('recieve-message', (data) => {
      console.log(data);
      setAllMessages((prev) => [...prev, data]);
    });
  }

  function handleSubmit(e) {
    console.log('got here');
    e.preventDefault();

    socket.emit('send-message', {
      username,
      message,
    });
  }
  return (
    <main>
      <h1>Chat app</h1>
      <p>Ingrese Usuario</p>
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <br />
      <br />

      {!!username && (
        <div>
          <ul>
            {allMessages &&
              allMessages.length > 0 &&
              allMessages.map((message, i) => {
                return (
                  <li key={i}>
                    <h2>{message.username}</h2>
                    <p>{message.message}</p>
                  </li>
                );
              })}
          </ul>

          <form onSubmit={handleSubmit}>
            <input
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>
        </div>
      )}
    </main>
  );
}
