import express from "express";
import cors from "cors";
import records from "./routes/records.js";

// set port & express app
const PORT = process.env.PORT || 8001;
const app = express();

// use cors as a security feature by the browser to prevent malicious websites from making requests to your server
app.use(cors());
app.use(express.json());
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
