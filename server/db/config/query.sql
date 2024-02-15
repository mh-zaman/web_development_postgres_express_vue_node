CREATE DATABASE your_data_base_name;

\c your_data_base_name;

-- Users Table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
    username character varying(50) UNIQUE NOT NULL,
    email character varying(100) UNIQUE NOT NULL,
    password character varying(200),
    name character varying(100) NOT NULL,
    avatar character varying(200),
    created TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP
);