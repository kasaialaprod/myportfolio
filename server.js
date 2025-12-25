import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import contactRoutes from './routes/contact.js';


const app = express();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD existe:', !!process.env.EMAIL_PASSWORD);
console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD?.length);


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
const corsMiddleware = cors(corsOptions);

app.use(cors({
  origin: 'https://darkgray-lobster-530765.hostingersite.com',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/api', contactRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});