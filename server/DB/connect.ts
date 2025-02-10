
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const database = new Pool({
    connectionString: process.env.DATA_BASE_URL,
});

export const createTables = async () => {
    const client = await database.connect();
    try {
        console.log("Checking and creating tables if necessary...");

        const query = `


        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


        -- Create order_status ENUM type if it doesn't exist
        DO $$ 
        BEGIN 
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
                CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'outfordelivery', 'delivered');
            END IF;
        END $$;

        -- Create Users Table
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            address_id UUID,
            hash_password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            seller BOOLEAN DEFAULT false,
            contact VARCHAR(20),
            avatar VARCHAR(255),
            last_login TIMESTAMP,
            is_verified BOOLEAN DEFAULT false,
            reset_password_token VARCHAR(500),
            reset_password_token_expire_at TIMESTAMP,
            verification_token VARCHAR(255),
            verification_token_expire_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create Addresses Table
        CREATE TABLE IF NOT EXISTS address (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            address_line_1 VARCHAR(400) NOT NULL,
            address_line_2 VARCHAR(400),
            city VARCHAR(40) NOT NULL,
            state VARCHAR(40) NOT NULL,
            country VARCHAR(40) NOT NULL,
            postal_code VARCHAR(20) NOT NULL,
            primary_address BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create Restaurants Table
        CREATE TABLE IF NOT EXISTS restaurants (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            owner UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(200) NOT NULL,
            description VARCHAR(1000),
            country VARCHAR(225) NOT NULL,
            city VARCHAR(100) NOT NULL,
            cuisines TEXT[] NOT NULL,
            delivery_time NUMERIC(5,2) NOT NULL,
            image_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create Menus Table
        CREATE TABLE IF NOT EXISTS menus (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(1000),
            price NUMERIC(10,2) NOT NULL,
            image_url VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create Orders Table
        CREATE TABLE IF NOT EXISTS orders (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            address_line_1 TEXT NOT NULL,
            address_line_2 TEXT,
            city VARCHAR(100) NOT NULL,
            postal_code VARCHAR(20) NOT NULL,
            country VARCHAR(100) NOT NULL,
            total_amount NUMERIC(10,2) NOT NULL,
            status order_status NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create Sub Orders Table
        CREATE TABLE IF NOT EXISTS sub_order (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
            restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
            total_amount NUMERIC(10,2) NOT NULL,
            status order_status NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create Order Items Table
        CREATE TABLE IF NOT EXISTS order_item (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            sub_order_id UUID NOT NULL REFERENCES sub_order(id) ON DELETE CASCADE,
            menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
            quantity INT NOT NULL CHECK (quantity > 0),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

        await client.query(query);
        console.log("Database tables checked/created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    } finally {
        client.release();
    }
};

export const query = async (text: any, params: any) => {
    const client = await database.connect();
    try {
        const result = await client.query(text, params);
        return result;
    } catch (error) {
        console.error("Database query error", { query: text, params });
        throw error;
    } finally {
        client.release();
    }
};

