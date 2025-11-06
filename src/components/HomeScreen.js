// src/components/HomeScreen.js
import React, { useState } from 'react';
import './HomeScreen.css';

// สังเกตว่าเรา "รับ" props 2 ตัว (onCreateRoom, onJoinRoom) มาจาก App.js
const HomeScreen = ({ onCreateRoom, onJoinRoom }) => {
  const [nickname, setNickname] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleCreateClick = () => {
    // ส่ง "ชื่อเล่น" กลับไปให้ App.js (ซึ่งจะยิง socket.emit)
    onCreateRoom(nickname);
  };

  const handleJoinClick = () => {
    // ส่ง "รหัสห้อง" และ "ชื่อเล่น" กลับไปให้ App.js
    onJoinRoom(roomCode, nickname);
  };

  return (
    <div className="home-container">
      <h1 className="title">SPY</h1>
      <h2 className="subtitle">(...who?)</h2>

      <div className="card">
        <input
          type="text"
          placeholder="ใส่ชื่อเล่นของคุณ (Nickname)"
          className="input-field"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button 
          onClick={handleCreateClick} 
          className="btn btn-create"
          disabled={!nickname}
        >
          สร้างห้อง (Create Room)
        </button>
      </div>

      <div className="card join-card">
        <p>หรือ เข้าร่วมห้องเพื่อน</p>
        <input
          type="text"
          placeholder="ใส่รหัสห้อง (Room Code)"
          className="input-field"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          maxLength={5}
        />
        <button 
          onClick={handleJoinClick} 
          className="btn btn-join"
          disabled={!nickname || roomCode.length < 5}
        >
          เข้าร่วม (Join)
        </button>
      </div>
      <p className="credit-text">สร้างโดย Newsoyes</p>
    </div>
    
  );
};

export default HomeScreen;