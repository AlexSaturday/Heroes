import express from 'express';
import cors from 'cors';
import { prisma } from './prisma';
import sessionRoutes from './routes/session.routes';


prisma.$connect()
  .then(() => console.log("DB connected"))
  .catch((e) => console.error("DB error:", e));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/sessions", sessionRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
