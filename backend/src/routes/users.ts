import express, {Request, Response} from 'express'
import { createUser, getUser, getUsers, deleteUser, updateUser, getUserInsurance } from "../controllers/userController";

const router = express.Router()

// GET all users
router.get('/', getUsers)

//GET single user
router.get('/:id', getUser)

//GET user insurance
router.post('/:id/insurance', getUserInsurance)

//POST new user
router.post('/', createUser)

//DELETE user
router.delete('/:id', deleteUser)

//PATCH user
router.patch('/:id', updateUser)

export default router;