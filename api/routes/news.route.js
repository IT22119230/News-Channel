import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { Create, getnews, deleteNews, Getnews, updatenews, Delete, getNewsBySlug } from '../controllers/news.controller.js';

const router = express.Router();

router.post('/create', verifyToken, Create);  // Ensure only authorized users can create
router.get('/get', getnews);
router.delete('/delete/:id', verifyToken, deleteNews);  
router.get('/getnews/:id',Getnews);
router.put('/updatenews/:id',updatenews);
router.delete('/delete/:id',Delete);
router.get('/getnewsbyslug/:slug', getNewsBySlug);

export default router;
