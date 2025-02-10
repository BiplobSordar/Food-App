import { Request, Response } from "express"
import { query } from "../DB/connect"
import bcrypt from 'bcrypt'
import { generateVerificationCode } from "../utils/generateVerificationCode"
import { generateJwt } from "../utils/generateJwtToken"
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeMessage } from "../mailtrap/email"
import { UUID } from "crypto"
import { randomBytes } from 'node:crypto'
import destroyImage from "../utils/deleteImage"
import uploadImageCloudinary from "../utils/imageUpload"
import cloudinary from "../utils/cloudinary"




export interface User {
    id: UUID,
    username: string,
    hash_password: string,
    contact: string,
    address_id: UUID,
    seller: boolean,
    avatar: string | undefined,
    last_login: Date | undefined,
    is_verified: boolean,
    reset_password_token: string | undefined,
    reset_password_token_expire_at: Date | undefined,
    verification_token: string | undefined,
    verification_token_expire_at: Date | undefined



}
export interface UserDocument extends User {
    created_at: Date,
    updated_at: Date
}

export const signUp = async (req: Request, res: Response): Promise<void> => {

    const { username, email, password, contact, } = req.body



    try {
        const findUser = await query(`select email from users where email =$1`, [email])
        const user = findUser.rows[0]

        if (user) {
            res.status(400).json({ success: false, message: 'User Already Exists.Please try another Email' })
            return

        }

        //    hash the password 

        const hashedPassword = await bcrypt.hash(password, 10)

        // Generate Verification Token 
        const verificationCode = generateVerificationCode()

        const date = new Date();
        const verificationCodeExpireAt = new Date(date.getTime() + 24 * 60 * 60 * 1000);





        // Insert Data Into Database



        const result = await query(`Insert Into users (username,email,hash_password,contact,verification_token,verification_token_expire_at) values ($1,$2,$3,$4,$5,$6)   RETURNING *`, [username, email, hashedPassword, contact, verificationCode, verificationCodeExpireAt])







        //  Generate Jwt Token 
        const token = generateJwt(res, result.rows[0])


        // send verification code to the email
        let owner = false
        if (email == 'biplob.code.bd@gmail.com') {

            await sendVerificationEmail(email, verificationCode)
            owner = true
        }



        res.status(201).json({ success: true, message: 'Account Created Successfully...', user: result.rows[0], owner })
        return


    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error. Cannot Create User' })
        return
    }
}



export const verifyEmail = async (req: Request, res: Response): Promise<void> => {

    try {
        const { verificationCode } = req.body

        const result = await query(`select * from users where verification_token = $1 and verification_token_expire_at > $2 `, [verificationCode, new Date])
        const user: any = result.rows[0]
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid or expired verification token"
            });
            return
        }


        await query('Update users set is_verified = $1 ,verification_token = $2 ,verification_token_expire_at = $3 where id = $4 RETURNING *', [true, undefined, undefined, user.id])

        // const newResult = await query(`select users.*,address.* from users left join address on address.user_id=users.id where users.id=$1 `, [user.id])
        // console.log(newResult,'thsi i sthe new result')

        // const verifyedUser: any = newResult.rows[0]



        await sendWelcomeMessage(user.email, user.username)

        res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            // user: verifyedUser
        })
        return


    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error .Cannot Verify User' })
        return
    }
}
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body



    try {
        const result = await query(`select * from users where email =$1`, [email])
        // select users.* ,address.*  from users Left Join address on address.user_id = users.id where email =$1
        const user: any = result.rows[0]

        if (!user) {
            res.status(400).json({ success: false, message: 'Incorrect Creadentials.Please Provide a Valid Information.' })
            return
        }

        // verifi the password 
        const isPasswordMatch = await bcrypt.compare(password, user.hash_password)

        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: 'Incorrect Creadentials.Please Provide a Valid Information.'
            })
            return
        }

        // Generate jwt token for the user 
        generateJwt(res, user)

        const lastLogin = new Date(); // Creates a valid timestamp

        await query(`update users set last_login =$1 where email = $2`, [lastLogin, email])
        let updatedResult = await query(`SELECT 
  users.id AS user_id, 
  users.contact,
  users.address_id,
  users.username,
  users.email,
  users.seller,
  users.avatar,
  users.last_login,
  users.reset_password_token,
  users. reset_password_token_expire_at,
  users.verification_token,
  users.verification_token_expire_at,
  address.city,
  address.address_line_1,
  address.address_line_2,
  address.country,
  address.primary_address,
  address.state,
  address.postal_code,
  restaurants.id as restaurant_id,
  address.created_at as address_created_at,
  address.updated_at as address_updated_at,
   users.created_at as user_created_at,
  users.updated_at as user_updated_at,
  users.is_verified

  
FROM users 
LEFT JOIN address ON address.user_id = user_id

LEFT JOIN restaurants on restaurants.owner = user_id
WHERE users.email = $1;

                  `, [email])



        let loggedInUser: any = updatedResult.rows[0]
        console.log(updatedResult.rows[0], 'thsi is the loggedInUser')





        res.status(200).json({
            success: true,
            message: `Welcome back ${loggedInUser.username}`,
            user: loggedInUser
        })
        return

    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error .Cannot Login User' })
        return
    }
}


export const logout = async (req: Request, res: Response): Promise<void> => {

    try {

        res.clearCookie('token').status(200).json({
            success: true,
            message: 'Logged out Successfully...'
        })
        return

    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error .User LogOut Failed' })
        return
    }
}


export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body

    try {
        const result = await query(`select * from users where email = $1`, [email])
        const user = result.rows[0]
        if (!user) {
            res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
            return
        }


        // generate reset token 
        const token = randomBytes(40);
        const resetToken = token.toString('hex')

        const date = new Date()
        const resetTokenExpiresAt = new Date(date.getTime() + 1 * 60 * 60 * 1000); // 1 hour


        await query('update users set reset_password_token =$1 ,reset_password_token_expire_at =$2 where email = $3', [resetToken, resetTokenExpiresAt, email])

        await sendPasswordResetEmail(email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`)


        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        })
        return

    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error .Failed To Sent Password Reset Link' })
        return
    }
}


export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params
    const data = req.body

    try {

        if (data.newPassword !== data.comfirmPassword) {
            res.status(400).json({
                success: false,
                message: "Please Make Sure The Password And ConfirmPassword Are Same."
            });
            return
        }
        const result = await query(`select * from users where reset_password_token =$1 and reset_password_token_expire_at>$2`, [token, new Date])
        const user: any = result.rows[0]

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
            return
        }

        const hash_password = await bcrypt.hash(data.newPassword, 10)
        await query(`update users set hash_password =$1,reset_password_token=$2,reset_password_token_expire_at=$3 where email = $4 and id =$5`, [hash_password, undefined, undefined, user.email, user.id])

        await sendResetSuccessEmail(user.email)


        res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
        return

    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error.Failed To Reset Password' })
        return
    }
}

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.id;
        const result = await query(`SELECT 
            users.id AS user_id, 
            users.contact,
            users.address_id,
            users.username,
            users.email,
            users.seller,
            users.avatar,
            users.last_login,
            users.reset_password_token,
            users. reset_password_token_expire_at,
            users.verification_token,
            users.verification_token_expire_at,
            address.city,
            address.address_line_1,
            address.address_line_2,
            address.country,
            address.primary_address,
            address.state,
            address.postal_code,
            address.created_at as address_created_at,
            address.updated_at as address_updated_at,
             users.created_at as user_created_at,
            users.updated_at as user_updated_at,
            users.is_verified ,
            restaurants.id as restaurant_id
          
            
          FROM users 
          LEFT JOIN address ON address.user_id = user_id
          LEFT JOIN restaurants on restaurants.owner = user_id
          WHERE users.id = $1;
          
                            `, [userId])
        const user: any = result.rows[0]
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return
        };
        user.hash_password = ''
        res.status(200).json({
            success: true,
            user,

        });
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error .Check Auth Failed" });
        return
    }
};



export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = req.id
    const { username, contact } = req.body

    try {

        const result = await query(`select * from users where id = $1`, [userId])
        const user = result.rows[0]
        if (!user) {
            res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
            return
        }
        await query('update users set username =$1,contact=$2 where id = $3', [username, contact, userId])
        res.status(200).json({
            success: true,
            message: 'User Details Updated Successfully'

        });
        return
    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error.Connot Update User Details' })
        return
    }
}

export const addAddress = async (req: Request, res: Response): Promise<void> => {


    const {
        streetAddress,
        city,
        state,
        postalCode,
        country,
        additionalDirections } = req.body


    const userId = req.id

    try {
        const result = await query(`select * from users where id =$1`, [userId])
        const user: any = result.rows[0]
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return
        };


        const createdAddress = await query(`Insert Into address (user_id,address_line_1,city,country,primary_address,state,postal_code,address_line_2) values ($1, $2, $3, $4, $5, $6, $7, $8 )  RETURNING *`, [userId, streetAddress, city, country, true, state, postalCode, additionalDirections])
        const addressId: any = createdAddress.rows[0]
        const updatedUser = await query(`update users set address_id =$1  where id = $2`, [addressId.id, userId])
        // console.log(createdAddress.rows[0],'thsi is the address i createrd')


        res.status(200).json({ success: true, message: 'Address Added Successfully', user: updatedUser.rows[0] })
        return
    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error,Failed To Add The Address' })
        return
    }



}

export const updateAddress = async (req: Request, res: Response): Promise<void> => {


    const {
        streetAddress,
        city,
        state,
        postalCode,
        country,
        additionalDirections } = req.body


    const userId = req.id

    try {
        const result = await query(`select * from users where id =$1`, [userId])
        const user: any = result.rows[0]
        if (!user.address_id) {
            res.status(404).json({
                success: false,
                message: 'Address Not Exists'
            });
            return
        };


        await query(`update address set address_line_1=$1,city=$2,country=$3,state=$4,postal_code=$5,address_line_2=$6 where id=$7`, [streetAddress, city, country, state, postalCode, additionalDirections, user.address_id])

        res.status(200).json({ success: true, message: 'Address Updated  Successfully' })
        return
    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error,Failed To Update The Address' })
        return
    }



}

export const uploadAvatar = async (req: Request, res: Response) => {
    console.log(req.body)

    try {
        const userId = req.id

        const result: any = await query(`select * from users where id= $1`, [userId])

        if (!result.rows[0]) {
            res.status(404).json({
                success: false,
                message: 'User Not Found'
            })
            return
        }

        if (result.rows[0].avatar) {
            destroyImage(result.rows[0].avatar)
        }
        const uploadResponse: any = await cloudinary.uploader.upload(req.body.file)
        await query(`update users set avatar=$1 where id=$2`, [uploadResponse.url, userId])


        res.status(200).json({ success: true, message: 'Avatart Uploaded Successfully', avatar: uploadResponse.url })
        return

    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }
}


export const beASeller = async (req: Request, res: Response): Promise<void> => {

    try {
        const userId = req.id
        const result = await query(`select * from users where id =$1`, [userId])
        const user: any = result.rows[0]
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User Not Exists'
            });
            return
        };

        await query(`update users set seller=$1 where id=$2`, [true, userId])

        res.status(200).json({ success: true, message: `Congratulation ${user.username} .Now You Are a Seller` })
        return
    } catch (error) {
        console.log(error, 'this error happend at users controllers.ts')
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }
}




