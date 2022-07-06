-- HOMEWORK SQL

------------------------------------------------------------------------------
-- CREANDO BD y TABLAS: imdb_test.sqlite.db

CREATE TABLE Movies (
    id INTEGER PRIMARY KEY,
    name TEXT NULL,
    year INTEGER NULL,
    rank REAL NULL    
);

CREATE TABLE  Actors (
   id INTEGER PRIMARY KEY,
   first_name TEXT NULL,
   laste_name TEXT NULL,
   gender TEXT NULL
);

-- TABLA INTERMEDIA:
CREATE TABLE Roles (
    actor_id INTEGER
    movie_id INTEGER
    role_name TEXT NULL
);

------------------------------------------------------------------------------
-- TRABAJANDO CON BASE DE DATOS EXISTENTE:
sqlite3 imdb-large.sqlite3.db
.header on
.mode column

SELECT * FROM movies_genres LIMIT 5; 

CREATE TABLE IF NOT EXISTS "actors" (
  "id" int(11) NOT NULL DEFAULT '0',
  "first_name" varchar(100) DEFAULT NULL,
  "last_name" varchar(100) DEFAULT NULL,
  "last_name" char(1) DEFAULT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "directors_genres" (
  "director_id" int(11) DEFAULT NULL,
  "genre" varchar(100) DEFAULT NULL,
  "prob" float DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "movies_directors" (
  "director_id" int(11) DEFAULT NULL,
  "movie_id" int(11) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "roles" (
  "actor_id" int(11) DEFAULT NULL,
  "movie_id" int(11) DEFAULT NULL,
  "role" varchar(100) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "directors" (
  "id" int(11) NOT NULL DEFAULT '0',
  "first_name" varchar(100) DEFAULT NULL,
  "last_name" varchar(100) DEFAULT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "movies" (
  "id" int(11) NOT NULL DEFAULT '0',
  "name" varchar(100) DEFAULT NULL,
  "year" int(11) DEFAULT NULL,
  "rank" float DEFAULT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "movies_genres" (
  "movie_id" int(11) DEFAULT NULL,
  "genre" varchar(100) DEFAULT NULL
);

------------------------------------------------------------------------------

-- actors:
id      first_name    last_name   gender
------  ------------  ----------  --------
188557  Abdullah      Gul         M


-- directors_genres:
director_id  genre        prob
-----------  -----------  ----------
34906        Drama        0.5


--movies_directors--INTERMEDIA!
director_id  movie_id
-----------  --------
1            378879

--roles--INTERMEDIA!
actor_id  movie_id  role
--------  --------  ----------
2         280088    Stevie

--directors
id    first_name  last_name
----  ----------  ------------
1114  A.          Aleksandrov

--movies
id  name    year  rank
--  ------  ----  ----
2   $       1971  6.4

--movies_genres
movie_id  genre
--------  -----------
1         Short

------------------------------------------------------------------------------
-- QUERYS

-- 1.Birthyear: Buscá todas las películas filmadas en el año que naciste.Birthyear
SELECT *
FROM movies
WHERE year = 1987;

-- 2.Cuantas películas hay en la DB que sean del año 1982? rta: 4597
SELECT COUNT(*) as total 
FROM movies
WHERE year = 1982;

--3.Buscá actores que tengan el substring stack en su apellido.

SELECT last_name
FROM actors
WHERE last_name
LIKE '%stack%';

-- 4.Buscá los 10 nombres y apellidos más populares entre los actores. Cuantos actores tienen cada uno de esos nombres y apellidos?

SELECT first_name, last_name, COUNT(*) as total
FROM actors
GROUP BY lower(first_name), lower(last_name)
ORDER BY total DESC
LIMIT 10;






