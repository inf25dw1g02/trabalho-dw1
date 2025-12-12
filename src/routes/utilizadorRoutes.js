import express from 'express';
import { 
    getAllUtilizadores, 
    createUtilizador, 
    getUtilizadorById, 
    updateUtilizador, 
    deleteUtilizador 
} from '../controllers/utilizadorController.js';

const router = express.Router();

router.route('/')
    .get(getAllUtilizadores)    
    .post(createUtilizador);    

router.route('/:id')
    .get(getUtilizadorById)     
    .put(updateUtilizador)      
    .delete(deleteUtilizador);  

export default router;