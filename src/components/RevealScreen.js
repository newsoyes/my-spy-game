// src/components/RevealScreen.js
import React from 'react';
import './RevealScreen.css'; // เราจะสร้าง CSS ต่อไป

// รับ props (revealData, onPlayAgain) มาจาก App.js
const RevealScreen = ({ revealData, onPlayAgain }) => {
  const {
    isSpyCaught,
    votedNickname,
    spyNickname,
    wordA,
    wordB
  } = revealData;

  return (
    <div className={`reveal-container ${isSpyCaught ? 'win' : 'lose'}`}>
      
      {isSpyCaught && (
        <>
          <h1 className="reveal-title-win">จับ Spy ได้แล้ว!</h1>
          <p className="reveal-subtitle">
            พวกคุณโหวต <strong>{votedNickname}</strong> ซึ่งเป็น Spy ถูกต้อง!
          </p>
        </>
      )}

      {!isSpyCaught && (
        <>
          <h1 className="reveal-title-lose">Spy ชนะ!</h1>
          <p className="reveal-subtitle">
            พวกคุณโหวต <strong>{votedNickname}</strong>... แต่ Spy ตัวจริงคือ <strong>{spyNickname}</strong>!
          </p>
        </>
      )}

      <div className="reveal-card">
        <h3>สรุปผล</h3>
        <p>คำของคนปกติคือ: <strong>{wordA}</strong></p>
        <p>คำของ Spy คือ: <strong>{wordB}</strong></p>
      </div>

      <button className="btn-play-again" onClick={onPlayAgain}>
        กลับไปที่ Lobby (เล่นอีกครั้ง)
      </button>

    </div>
  );
};

export default RevealScreen;