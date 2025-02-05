# PruebaTecnica

# PrueTec

hacer un npm i para instalar las dependencias
▪ Iniciar el proyecto.
▪ Instalar dependencias.
▪ crear un archivo .env y colocar lo siguiente

PORT=5002
DB_USER=postgres
DB_HOST=localhost
DB_NAME=pt
DB_PASSWORD=1234
DB_PORT=5432
JWT_SECRET=clave_secreta_segura
FOURSQUARE_API_KEY=TU_API_KEY_DE_FOURSQUARE

ejecutar los siguientes comandos para crear la base de datos

**\*\*** esto es para crear la base de datos
-- Database: pt

-- DROP DATABASE IF EXISTS pt;

CREATE DATABASE pt
WITH
OWNER = postgres
ENCODING = 'UTF8'
LC_COLLATE = 'Spanish_Colombia.1252'
LC_CTYPE = 'Spanish_Colombia.1252'
LOCALE_PROVIDER = 'libc'
TABLESPACE = pg_default
CONNECTION LIMIT = -1
IS_TEMPLATE = False;

**\*\*** Aqui se crea la tabla historial_busqueda

-- Table: public.historial_busqueda

-- DROP TABLE IF EXISTS public.historial_busqueda;

CREATE TABLE IF NOT EXISTS public.historial_busqueda
(
id integer NOT NULL DEFAULT nextval('historial_busqueda_id_seq'::regclass),
usuario_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
nombre_restaurante character varying(255) COLLATE pg_catalog."default" NOT NULL,
tipo_comida character varying(255) COLLATE pg_catalog."default",
latitud numeric(10,8) NOT NULL,
longitud numeric(11,8) NOT NULL,
fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT historial_busqueda_pkey PRIMARY KEY (id)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.historial_busqueda
OWNER to postgres;

**\*\*** Aqui se crea la tabla users

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
email character varying(255) COLLATE pg_catalog."default" NOT NULL,
password text COLLATE pg_catalog."default" NOT NULL,
created_at timestamp without time zone DEFAULT now(),
CONSTRAINT users_pkey PRIMARY KEY (id),
CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
OWNER to postgres;

##### ejecutar este comando en la carpeta raiz

nodemon backend/server.js

##### ejecutar este comando en la carpeta frontend para levantar los servicios

npm start
