import { Request, Response } from "express";
import { query } from "../DB/connect";
import uploadImageCloudinary from "../utils/imageUpload";
import destroyImage from "../utils/deleteImage";


export const addMenu = async (req: Request, res: Response): Promise<void> => {
    const { restaurantId } = req.params
    const { name, description, price } = req.body



    try {
        const file = req.file
        console.log(file, 'this i s the file')
        if (!file) {
            res.status(400).json({
                success: false,
                message: "Image is required"
            })
            return
        };


        const restarurant: any = await query(`select * from restaurants where owner = $1`, [req.id])
        if (!restarurant.rows[0]) {
            res.status(400).json({
                success: false,
                message: "Restaurant Not Exists"
            })
            return
        }

        // upload Image Need to be implemented
        const image_url = await uploadImageCloudinary(file as Express.Multer.File)



        await query('Insert Into menus (name,description,price,image_url,restaurant_id) values($1,$2,$3,$4,$5)', [name, description, price, image_url, restarurant.rows[0].id])

        res.status(200).json({ success: true, message: 'Menu added successfully' })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error.Cannot Create The Menu' })
        return
    }
}
export const getMenus = async(req: Request, res: Response): Promise<void> => {
   try {
    const result=await query(`select * from menus`,[])
    res.status(200).json({ success: true,menus:result.rows })
    return
   } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal Server Error.Cannot Get The Menus' })
    return
   }
}

export const editMenu = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { name, description, price } = req.body
    const file = req.file;


    try {

        const result: any = await query('select * from menus where id =$1', [id])

        if (!result.rows[0]) {
            res.status(404).json({
                success: false,
                message: "Menu not found!"
            })
            return
        }
        let image = result.rows[0].image_url

        // upload Image Need to be implemented
        if (file) {
            await destroyImage(result.rows[0].image_url)
            image = await uploadImageCloudinary(file as Express.Multer.File)
        }



        await query('update menus set name=$1,description=$2,price=$3 ,image_url=$4 where id =$5', [name, description, price, image, id])
        res.status(200).json({ success: true, message: 'Menu Successfully Updated' })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error.Connot Update The Menu' })
        return
    }
}
export const deleteMenu = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    try {
        const [menu]: any = await query('select * from menus where id =$1', [id])

        if (!menu) {
            res.status(404).json({
                success: false,
                message: "Menu not found!"
            })
            return
        }

        await query('delete from menus where id =$1', [id])
        res.status(200).json({ success: true, message: 'success' })
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error.Connot Update The Menu' })
        return
    }
}

