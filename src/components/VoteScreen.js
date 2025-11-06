// src/components/VoteScreen.js
import React, { useState } from 'react';
import socket from '../socket';
import './VoteScreen.css';

// รับ props (playerList, myId, roomCode) มาจาก App.js
const VoteScreen = ({ playerList, myId, roomCode }) => {

  const [votedPlayerId, setVotedPlayerId] = useState(null);

  const handleVote = (playerId) => {
    if (votedPlayerId) return; // ถ้าโหวตไปแล้ว, ห้ามกดซ้ำ

    // ล็อคหน้าจอทันที
    setVotedPlayerId(playerId); 
    console.log(`คุณโหวต: ${playerId}`);
    
    // (อัปเดต) ส่งคะแนนโหวตไปหา Server
    socket.emit('submitVote', roomCode, playerId);
  };

  return (
    <div className="vote-container">
      <h1 className="vote-title">ได้เวลาโหวต!</h1>
      <h2 className="vote-subtitle">ใครคือคนที่ได้ "คำ" ไม่เหมือนเพื่อน?</h2>

      <div className="vote-grid">
        {playerList.map(player => {
          // เราโหวตตัวเองไม่ได้
          if (player.id === myId) return null;

          return (
            <button 
              key={player.id}
              className={`btn-vote ${votedPlayerId === player.id ? 'voted' : ''}`}
              onClick={() => handleVote(player.id)}
              disabled={votedPlayerId} // ถ้าโหวตไปแล้ว, ปิดปุ่มอื่น
            >
              โหวต {player.nickname}
            </button>
          );
        })}
      </div>

      {votedPlayerId && (
        <p className="waiting-text">คุณโหวตแล้ว! กำลังรอคนอื่น...</p>
      )}
    </div>
  );
};

export default VoteScreen;