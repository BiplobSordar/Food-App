import { MailtrapClient } from 'mailtrap'
import dotenv from 'dotenv'
dotenv.config()

export const client = new MailtrapClient({ token: process.env.MAILTRAP_SECRET! })

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Little Bite"
}   