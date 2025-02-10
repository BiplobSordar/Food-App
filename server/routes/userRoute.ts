import express from 'express'
import { addAddress, beASeller, checkAuth, forgotPassword, login, logout, resetPassword, signUp, updateAddress, updateProfile, uploadAvatar, verifyEmail } from '../controllers/usersControllers'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import upload from '../middlewares/multer'


const router = express.Router()
router.route('/check-auth').get(isAuthenticated, checkAuth)
router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/verify-email').post(verifyEmail)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)
router.route('/profile/update').put(isAuthenticated, updateProfile)
router.route('/add-address').post(isAuthenticated, addAddress)
router.route('/update-address').post(isAuthenticated, updateAddress)
router.route('/become-seller').put(isAuthenticated, beASeller)
router.route('/upload-avatar').post(isAuthenticated, upload.single('avatat'), uploadAvatar)

export default router