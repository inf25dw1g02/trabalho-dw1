import express from 'express';
import { 
    getAllLivros, 
    createLivro, 
    getLivroById, 
    updateLivro, 
    deleteLivro 
} from '../controllers/livroController.js';

const router = express.Router();

router.route('/')
    .get(getAllLivros)    
    .post(createLivro);    

router.route('/:id')
    .get(getLivroById)     
    .put(updateLivro)      
    .delete(deleteLivro);  

export default router;