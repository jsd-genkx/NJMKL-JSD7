import { MongoClient, ServerApiVersion } from "mongodb";

// to establish connection
// we need the uri or connection string and initialize a MongoClient instance
const uri = process.env.ATLAS_URI || "";
// client ในที่นี้หมายถึง backend app or express app นะครับ
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // connect to the server
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log(
    "Pinged your deployment. ✅ You are successfully connected to MongoDB, happy coding! 🙌"
  );
} catch (err) {
  console.error(err);
}

// if the db does not exist, it will be created automatically
// อย่าลืมเปลี่่ยนชื่อ db ตามที่ design ไว้นะครับ
let db = client.db("njmkl");

export default db;
