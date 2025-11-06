// src/App.js
import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import VoteScreen from './components/VoteScreen';
import RevealScreen from './components/RevealScreen'; // (เพิ่ม)
import socket from './socket';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'lobby', 'game', 'vote', 'reveal'
  
  // -- State ของห้อง --
  const [users, setUsers] = useState([]);
  const [roomCode, setRoomCode] = useState('');

  // -- State ของเกม --
  const [myWord, setMyWord] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [currentSpeakerId, setCurrentSpeakerId] = useState(null);
  
  // (เพิ่ม)
  const [revealData, setRevealData] = useState(null);

  useEffect(() => {
    socket.connect();

    // ... (socket.on 'roomCreated', 'joinedRoom', 'userJoined', 'error', 'userLeft' ของเดิม) ...
    socket.on('roomCreated', (code, usersList) => {
      console.log("สร้างห้องสำเร็จ!", code, usersList);
      setRoomCode(code);
      setUsers(usersList);
      setCurrentScreen('lobby');
    });

    socket.on('joinedRoom', (code, usersList) => {
      console.log("เข้าร่วมห้องสำเร็จ!", code, usersList);
      setRoomCode(code);
      setUsers(usersList);
      setCurrentScreen('lobby');
    });

    socket.on('userJoined', (newUser) => {
      console.log("มีคนใหม่เข้ามา:", newUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });
    
    socket.on('error', (message) => {
      alert(message);
    });

    socket.on('userLeft', (disconnectedUserId) => {
      console.log("มีคนออก:", disconnectedUserId);
      setUsers((prevUsers) => 
        prevUsers.filter(user => user.id !== disconnectedUserId)
      );
      setPlayerList((prevList) => 
        prevList.filter(player => player.id !== disconnectedUserId)
      );
    });
    
    // ... (socket.on 'gameStarted', 'newSpeaker', 'startVotePhase' ของเดิม) ...
    socket.on('gameStarted', (payload) => {
      console.log("เกมเริ่มแล้ว! บทบาทของฉัน:", payload);
      setMyWord(payload.word);
      setPlayerList(payload.playerList);
      setCurrentSpeakerId(payload.currentSpeakerId);
      setCurrentScreen('game');
    });

    socket.on('newSpeaker', (newSpeakerId) => {
      console.log("คนพูดคนใหม่คือ:", newSpeakerId);
      setCurrentSpeakerId(newSpeakerId);
    });
    
    socket.on('startVotePhase', (playerList) => {
      console.log("Server สั่งเริ่มโหวต!");
      setPlayerList(playerList); 
      setCurrentScreen('vote');
    });

    // (เพิ่ม)
    socket.on('revealResult', (payload) => {
      console.log("ได้เวลาเฉลย:", payload);
      setRevealData(payload); // เก็บข้อมูลเฉลย
      setCurrentScreen('reveal'); // !!! เปลี่ยนหน้าจอ !!!
    });


    // Clean up
    return () => {
      socket.disconnect();
      socket.off('roomCreated');
      socket.off('joinedRoom');
      socket.off('userJoined');
      socket.off('error');
      socket.off('userLeft');
      socket.off('gameStarted');
      socket.off('newSpeaker');
      socket.off('startVotePhase');
      socket.off('revealResult'); // (เพิ่ม)
    };
  }, []); // [] ทำครั้งเดียว

  // -- ฟังก์ชันยิง Event --
  const handleCreateRoom = (nickname) => {
    socket.emit('createRoom', nickname);
  };

  const handleJoinRoom = (code, nickname) => {
    socket.emit('joinRoom', code, nickname);
  };

  // (เพิ่ม)
  const handlePlayAgain = () => {
    // แค่เปลี่ยนหน้าจอกลับไปที่ Lobby
    setRevealData(null);
    setCurrentScreen('lobby');
  };

  // -- ส่วนแสดงผล --
  return (
    <div className="App">
      {currentScreen === 'home' && (
        <HomeScreen 
          onCreateRoom={handleCreateRoom} 
          onJoinRoom={handleJoinRoom} 
        />
      )}
      
      {currentScreen === 'lobby' && (
        <LobbyScreen 
          users={users} 
          roomCode={roomCode} 
        />
      )}

      {currentScreen === 'game' && (
        <GameScreen 
          word={myWord}
          playerList={playerList}
          currentSpeakerId={currentSpeakerId}
          roomCode={roomCode}
          myId={socket.id}
        />
      )}
      
      {currentScreen === 'vote' && (
        <VoteScreen
          playerList={playerList}
          myId={socket.id}
          roomCode={roomCode}
        />
      )}

      {/* (เพิ่ม) */}
      {currentScreen === 'reveal' && (
        <RevealScreen
          revealData={revealData}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;