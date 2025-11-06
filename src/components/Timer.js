// src/components/Timer.js
import React, { useState, useEffect } from 'react';
import socket from '../socket'; // (เพิ่ม) Import socket
import './GameScreen.css';

// (เพิ่ม) รับ roomCode มาเป็น prop
const Timer = ({ roomCode }) => {
  // 300 วินาที = 5 นาที
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("หมดเวลา! กำลังเรียกโหวต...");
      // (เพิ่ม) เมื่อเวลาหมด ให้ยิง 'requestVote'
      // เราเช็คก่อนว่า timeLeft === 0 เพื่อกันการยิงซ้ำซ้อน
      if (timeLeft === 0) {
        socket.emit('requestVote', roomCode);
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [timeLeft, roomCode]); // (เพิ่ม) ใส่ roomCode ใน dependency

  // ฟังก์ชันแปลง "วินาที" (เช่น 125) ให้เป็น "นาที:วินาที" (เช่น "02:05")
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className={`timer-display ${timeLeft < 60 ? 'timer-low' : ''}`}>
      {formatTime()}
    </div>
  );
};

export default Timer;