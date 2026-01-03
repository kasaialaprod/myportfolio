import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import contactRoutes from './routes/contact.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));


console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD existe:', !!process.env.EMAIL_PASSWORD);
console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD?.length);


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
const corsMiddleware = cors(corsOptions);

app.use(cors({
  origin: [
    'https://israkokesha.onrender.com',
    'http://localhost:3000',
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.use(express.json());
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});