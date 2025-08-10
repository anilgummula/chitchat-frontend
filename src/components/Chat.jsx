import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from "socket.io-client";

export const Chat = () => {
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
    const { id: receiverId } = useParams(); // Gets id from route

    const navigate = useNavigate();

    // const [receiverName, setReceiverName] = useState('');
    const [receiverInfo, setReceiverInfo] = useState({ name: '', dp: '',email:'' });

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const chatEndRef = useRef(null);

    const socket = useRef();

    useEffect(() => {
        socket.current = io(API_BASE_URL);
        const userId = localStorage.getItem("loggedInUserId"); // store this on login
        socket.current.emit("addUser", userId);

        socket.current.on("getMessage", (data) => {
            setMessages(prev => {
                if (
                prev.some(
                    m =>
                    m.text === data.text &&
                    m.image === data.image &&
                    new Date(m.createdAt).getTime() === new Date(data.createdAt).getTime()
                )
                ) {
                return prev; // already exists
                }
                return [...prev, data];
            });
        });

        return () => {
        socket.current.disconnect();
        };
    }, []);


    const fetchReceiverInfo = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${receiverId}`, {
        //  method:"POST",
        headers : {
            // 'Content-Type': 'application/json',
            authorization : localStorage.getItem("token"),
        },
        // body: JSON.stringify({ email:useremail })
        
        });
        const data = await response.json();
        setReceiverInfo({ name: data.name || 'Unknown', dp: data.profilePic || '' ,email: data.email});
    } catch (error) {
        console.error('Error fetching receiver info:', error.message);
    }
    };



    const fetchMessages = async () => {
        try {
        const response = await fetch(`${API_BASE_URL}/message/${receiverId}`, {
            headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
            },
        });
        const data = await response.json();
        setMessages(data);
        } catch (error) {
        console.error('Error fetching messages:', error.message);
        }
    };

    const handleSend = async () => {
        try {
        const payload = {
            text,
            image: image ? await toBase64(image) : null,
        };

        const response = await fetch(`${API_BASE_URL}/message/send/${receiverId}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const newMsg = await response.json();
            setMessages(prev => [...prev, newMsg]);

            setText('');
            setImage(null);
            setPreviewImage(null);
        }
        } catch (error) {
        console.error('Error sending message:', error.message);
        }
    };



    useEffect(() => {
        fetchReceiverInfo();
        fetchMessages();
    }, [receiverId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
        
          {/* Header */}
            <div className="flex items-center justify-between bg-white/10 p-3 mb-4 ">
            
            {/* Profile Section */}
            <div className="flex items-center space-x-4">
                <span className="border rounded-full bg-white w-12 h-12 overflow-hidden flex items-center justify-center">
                <img
                    src={receiverInfo.dp || "/profile-picture.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
                </span>

                <div className="text-white flex flex-col text-sm">
                <span className="font-medium text-base">{receiverInfo.name}</span>
                {/* <span className="text-gray-300">{receiverInfo.email}</span> */}
                </div>
            </div>

            {/* Back Button */}
            <button
                className="border rounded-md bg-white text-black px-3 py-1 font-semibold hover:bg-gray-300"
                onClick={() => navigate('/home')}
            >
                Back
            </button>
            </div>



      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.senderId === receiverId ? 'text-left' : 'text-right'}`}>
            {msg.text && <p className="mb-1">{msg.text}</p>}
            {msg.image && (
              <img
                src={msg.image}
                alt="Sent media"
                className="max-w-xs mx-auto rounded"
              />
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {previewImage && (
        <div className="text-center p-2">
          <img src={previewImage} alt="Preview" className="max-w-xs mx-auto" />
        </div>
      )}

      {/* <div className="p-4 border-t border-gray-700 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
          }}
          className="text-white"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </div> */}
      <div className="p-3 border-t border-gray-700 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
  {/* Text Input */}
  <input
  type="text"
  placeholder="Type your message..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSend();
    }
  }}
  className="flex-1 p-2 rounded bg-gray-800 text-white w-full sm:w-auto"
/>


  {/* File Input */}
  {/* <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }}
    className="text-white w-full sm:w-auto"
  /> */}

  {/* Send Button */}
  <button
    onClick={handleSend}
    className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 w-full sm:w-auto"
  >
    Send
  </button>
</div>

    </div>
  );
};
