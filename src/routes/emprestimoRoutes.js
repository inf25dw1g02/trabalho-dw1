import express from 'express';
import { 
    getAllEmprestimos, 
    createEmprestimo, 
    getEmprestimoById, 
    updateEmprestimo, 
    deleteEmprestimo 
} from '../controllers/emprestimoController.js';

const router = express.Router();

router.route('/')
    .get(getAllEmprestimos)    
    .post(createEmprestimo);    

router.route('/:id')
    .get(getEmprestimoById)     
    .put(updateEmprestimo)      
    .delete(deleteEmprestimo);  

export default router;