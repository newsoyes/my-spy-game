// src/components/GameScreen.js
import React from 'react';
import Timer from './Timer';
import socket from '../socket';
import './GameScreen.css';

const GameScreen = ({ word, playerList, currentSpeakerId, roomCode, myId }) => {

  const handleEndTurn = () => {
    console.log("กำลังส่ง 'endTurn'");
    socket.emit('endTurn', roomCode);
  };

  // (เพิ่ม) ฟังก์ชันสำหรับปุ่มเริ่มโหวต
  const handleRequestVote = () => {
    if (window.confirm("คุณแน่ใจนะว่าจะเริ่มโหวตเลย?")) {
      console.log("กำลังส่ง 'requestVote'");
      socket.emit('requestVote', roomCode);
    }
  };

  const amISpeaker = (myId === currentSpeakerId);

  return (
    <div className="game-container">
      
      {/* (จุดที่ 1: ส่ง roomCode ให้ Timer) */}
      <Timer roomCode={roomCode} />

      {/* ส่วนที่ 2: รายชื่อผู้เล่น */}
      <div className="player-grid">
        {playerList.map(player => (
          <div 
            key={player.id}
            className={`player-card ${player.id === currentSpeakerId ? 'spotlight' : ''}`}
          >
            <div className="player-avatar">?</div>
            <div className="player-name">{player.nickname}</div>
          </div>
        ))}
      </div>
      
      {/* (จุดที่ 2: อัปเดต action-area) */}
      <div className="action-area">
        {amISpeaker && (
          <button 
            className="btn btn-end-turn"
            onClick={handleEndTurn}
          >
            พูดจบแล้ว
          </button>
        )}
        
        {/* ปุ่ม "เริ่มโหวต" (แสดงตลอดเวลา) */}
        <button 
          className="btn btn-call-vote"
          onClick={handleRequestVote}
        >
          เริ่มโหวต!
        </button>
      </div>

      {/* ส่วนที่ 3: การ์ดคำใบ้ (ลับเฉพาะเรา) */}
      <div className={`my-word-card`}>
        <p>คำใบ้ของคุณคือ:</p>
        <h2 className="my-word">{word}</h2>
      </div>
    </div>
  );
};

export default GameScreen;