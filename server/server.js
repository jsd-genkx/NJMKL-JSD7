import express from "express";
import cors from "cors";
import records from "./routes/records.js";

// set port & express app
// เปลี่ยน PORT ตามที่ต้องการได้เลยครับ
// ไปกำหนดไว้ใน .env file ก็ได้ครับ ตอนนี้ผมยังไม่ได้กำหนดไว้
const PORT = process.env.PORT || 8001;
const app = express();

// use cors as a security feature
// by the browser to prevent malicious websites
// from making requests to your server
app.use(cors());
// Creates an Express application.
// The express() function is imported from the express library.
// ดูตรงนี้นะครับครับ -> express.json() คือ middleware จาก express library
// และทำให้เขาจะทำการ parse result object และทำให้ available ใน req.body
// ถ้าไม่ใช้ express.json() req.body จะเป็น undefined นะครับ
app.use(express.json());
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
