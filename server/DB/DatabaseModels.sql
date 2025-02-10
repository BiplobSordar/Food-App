CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TYPE order_status AS ENUM (
    'pending',
    'confirmed',
    'preparing',
    'outfordelivery',
    'delivered'
);



CREATE TABLE IF NOT EXISTS address (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    address_line_1 VARCHAR(400) NOT NULL,
    address_line_2 VARCHAR(400),
    city VARCHAR(40) NOT NULL,
    country VARCHAR(40) NOT NULL,
    primary_address BOOLEAN DEFAULT true,
    state VARCHAR(40) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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


CREATE TABLE IF NOT EXISTS restaurants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner UUID NOT NULL,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(1000),
    country VARCHAR(225) NOT NULL,
    city VARCHAR(100) NOT NULL,
    cuisines TEXT[] NOT NULL,  -- Array of cuisines
    delivery_time NUMERIC(5,2) NOT NULL,  -- More precise delivery time
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_restaurant_owner FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS menus (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    price NUMERIC(10,2) NOT NULL,  -- Supports up to 2 decimal places
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_menu_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);


-- Define ENUM type for order status
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');
    END IF;
END $$;

-- Create the orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Ensure the ENUM type exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');
    END IF;
END $$;

-- Create the sub_order table
CREATE TABLE IF NOT EXISTS sub_order (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    total_amount NUMERIC(10,2) NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS order_item (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sub_order_id UUID NOT NULL REFERENCES sub_order(id) ON DELETE CASCADE,
    menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0), -- Ensures quantity is always positive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);




