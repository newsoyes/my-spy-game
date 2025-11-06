// src/socket.js
import { io } from 'socket.io-client';

// URL ของ "สมอง" (Backend) ของเรา
const URL = "http://localhost:4000";

// สร้างการเชื่อมต่อ
// autoConnect: false หมายความว่า เราจะสั่งให้มัน "ต่อสาย" เองเมื่อพร้อม
const socket = io(URL, { autoConnect: false });

// ส่งออกไปให้ไฟล์อื่นใช้
export default socket;