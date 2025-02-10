import { Response } from "express"
import jwt from "jsonwebtoken"

export const generateJwt = (res: Response, user: any) => {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })

    return token
}