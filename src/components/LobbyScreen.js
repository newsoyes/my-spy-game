// src/components/LobbyScreen.js
import React from 'react';
import './LobbyScreen.css';
import socket from '../socket'; // 1. Import socket
// รับ props (roomCode, users, onStartGame) มาจาก App.js
const LobbyScreen = ({ roomCode, users }) => {

  // Logic ง่ายๆ: เราถือว่าคนแรกที่เข้าห้อง (index 0) คือ Host
  // (ในอนาคต เราควรเช็คจาก socket.id ของเราเอง)
  const isHost = true; // สมมติว่าเป็น Host ไปก่อนเพื่อโชว์ปุ่ม

  const handleStartGame = () => {
    // !! นี่คือจุดที่เราจะยิง Event ไปหา Server ในอนาคต
    console.log("กดเริ่มเกม!");
    // (อนาคต: socket.emit('startGame', roomCode);)
    socket.emit('startGame', roomCode); // ยิง Event 'startGame' ไปหา Server
  };
  

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    alert("คัดลอกรหัสห้องแล้ว!");
  };

  return (
    <div className="lobby-container">
      <div className="lobby-header">
        <h2>ห้องพักรอ (LOBBY)</h2>
        <p>ชวนเพื่อนคุณเข้ามาในห้องนี้:</p>
      </div>

      <div className="room-code-card" onClick={copyCodeToClipboard}>
        <span className="room-code-label">รหัสห้อง:</span>
        <span className="room-code-text">{roomCode}</span>
        <span className="copy-hint">(คลิกเพื่อคัดลอก)</span>
      </div>

      <div className="player-list-container">
        <h3>ผู้เล่นในห้อง ({users.length}):</h3>
        <ul className="player-list">
          {users.map((user, index) => (
            <li key={user.id} className="player-item">
              {user.nickname}
              {index === 0 && <span className="host-badge">(HOST)</span>}
            </li>
          ))}
        </ul>
      </div>

      {isHost && (
        <button 
          className="btn btn-start-game"
          onClick={handleStartGame}
          disabled={users.length < 2} // สมมติว่าต้องมี 2 คนขึ้นไป
        >
          เริ่มเกม (Start Game)
        </button>
      )}

      {!isHost && (
        <p className="waiting-text">กำลังรอ Host เริ่มเกม...</p>
      )}
    </div>
  );
};

export default LobbyScreen;