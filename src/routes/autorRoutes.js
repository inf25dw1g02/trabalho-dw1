import express from 'express';
import { 
    getAllAutores, 
    createAutor, 
    getAutorById, 
    updateAutor, 
    deleteAutor 
} from '../controllers/autorController.js';

const router = express.Router();

router.route('/')
    .get(getAllAutores)    
    .post(createAutor);    

router.route('/:id')
    .get(getAutorById)     
    .put(updateAutor)      
    .delete(deleteAutor);  

export default router;