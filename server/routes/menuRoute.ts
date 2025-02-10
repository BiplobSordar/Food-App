import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { addMenu, deleteMenu, editMenu, getMenus } from '../controllers/menuController'
import upload from '../middlewares/multer'
const router = express.Router()

router.route('/').post(isAuthenticated, upload.single('image'), addMenu)
router.route('/menu').get(getMenus)
router.route('/:id').put(isAuthenticated, upload.single('image'), editMenu)
router.route('/:id').delete(isAuthenticated, deleteMenu)


export default router