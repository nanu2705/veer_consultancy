import React, { useContext, useEffect } from 'react'
import './Socket.scss'
import io from 'socket.io-client';
import MyContext from '../../Common/Context/MyContext';

// Initialize the socket connection
const socket = io('http://localhost:5000');

const Socket = () => {
  const { message, setMessage, messages, setMessages, sockets,setSockets } = useContext(MyContext);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup the connection when the component unmounts
    return () => {
      socket.off('receive_message');
    };
  }, [setMessages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const timestamp = new Date().toLocaleTimeString(); // Get current time
      const messageData = {
        text: message,
        time: timestamp
      };
      
      // Send message with timestamp to the server
      socket.emit('send_message', messageData);
      setMessage(''); // Clear input field
    }
  };

 

  return (
    <div className='socket-main'>
      {sockets && (
        <><h2>Frequently asked questions</h2>
        <spans>Everything you need to know about the product and billing.</spans>
       
          <div className="socket-overlay">

            <div className="socket-content">

              <div className="socket-head">
    <span  className="cancel-icon" id="smodal" onClick={() => setSockets(false)}>&times;</span>
                
                <h5>Ask Question</h5></div>
              
              <div className='socket-message'>
                {messages.map((msg, index) => (
                  <div key={index} className="message-item">
                    <span className="message-time">{msg.time}</span> 
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>

              <div className="input-socket">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  />
                   <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Socket;
