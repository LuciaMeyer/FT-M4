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

-- 1.Buscá todas las películas filmadas en el año que naciste.Birthyear
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

--5.Listá el top 100 de actores más activos junto con el número de roles que haya realizado.
SELECT first_name, last_name, COUNT(*) as total
FROM actors
JOIN roles ON roles.actor_id = actors.id
GROUP BY actor_id
ORDER by total DESC
LIMIT 100;

--6.Cuantas películas tiene IMDB por género? Ordená la lista por el género menos popular.
SELECT genre, COUNT(*) as total
FROM movies_genres
GROUP BY genre
ORDER BY total;

--7.Listá el nombre y apellido de todos los actores que trabajaron en la película "Braveheart" de 1995, ordená la lista alfabéticamente por apellido.

SELECT first_name, last_name
FROM actors
JOIN roles ON actors.id = roles.actor_id
JOIN movies ON movies.id = roles.movie_id
WHERE movies.name = "Braveheart" AND movies.year = 1995
ORDER BY last_name;

--8.Listá todos los directores que dirigieron una película de género 'Film-Noir' en un año bisiesto (para reducir la complejidad, asumí que cualquier año divisible por cuatro es bisiesto). Tu consulta debería devolver el nombre del director, el nombre de la peli y el año. Todo ordenado por el nombre de la película.

-- directors (id) <--> (director id) movies_directors (movie_id) <--> (id) movies (id) <--> (movie_id) movies_genres


SELECT d.first_name, m.name, m.year
FROM directors as d
JOIN movies_directors as md ON d.id = md.movie_id
JOIN movies as m ON md.movie_id = m.id
JOIN movies_genres as mg ON m.id = mg.movie_id
WHERE mg.genre = 'Film-Noir' AND m.year % 4 = 0
ORDER by m.name;

--9.Listá todos los actores que hayan trabajado con Kevin Bacon en películas de Drama (incluí el título de la peli). Excluí al señor Bacon de los resultados.

-- paso 1: buscar pelis por id donde alla trabajado Kevin Bacon
-- movies (id) -- (movie_id) roles (actor_id) - (id) actors

SELECT m.id
FROM movies as m
JOIN roles as r ON m.id = r.movie_id
JOIN actors as a ON r.actor_id = a.id
WHERE a.first_name = 'Kevin' AND a.last_name = 'Bacon';

-- paso 2 listar actores y nombre de peli que hayan trabajado con Kevin en genero drama, excluyendoló 
-- actors (id) -- (actor_id) roles (movie_id) - (id) movies (id) -- (movie_id) movies_genres  
--paso 3 unir las queries en una:

SELECT DISTINCT a.first_name, a.last_name
FROM actors as a
JOIN roles as r ON a.id = r.actor_id
JOIN movies as m ON r.movie_id = m.id
JOIN movies_genres as mg ON m.id = mg.movie_id
WHERE mg.genre = 'Drama' AND m.id IN (
  SELECT m.id
  FROM movies as m
  JOIN roles as r ON m.id = r.movie_id
  JOIN actors as a ON r.actor_id = a.id
  WHERE a.first_name = 'Kevin' AND a.last_name = 'Bacon'
) AND (a.first_name || a.last_name != 'KevinBacon')
ORDER BY a.last_name DESC;

--10.Qué actores actuaron en una película antes de 1900 y también en una película después del 2000?

--paso 1 traer id de actores que trabajaron antes de 1900:
SELECT r.actor_id
FROM roles as r
JOIN movies as m ON r.movie_id = m.id
WHERE m.year < 1900;

--paso 1 traer id de actores que trabajaron después de 2000:
SELECT r.actor_id
FROM roles as r
JOIN movies as m ON r.movie_id = m.id
WHERE m.year > 2000;

--paso 3 traer actores que trabajaron en esas 2 búsquedas:
SELECT *
FROM actors 
WHERE id IN (
  SELECT r.actor_id
  FROM roles as r
  JOIN movies as m ON r.movie_id = m.id
  WHERE m.year < 1900
) AND id IN (
  SELECT r.actor_id
  FROM roles as r
  JOIN movies as m ON r.movie_id = m.id
  WHERE m.year > 2000
); -- tarda mucho la query

--11.Buscá actores que actuaron en cinco o más roles en la misma película después del año 1990. Noten que los ROLES pueden tener duplicados ocasionales, sobre los cuales no estamos interesados: queremos actores que hayan tenido cinco o más roles DISTINTOS en la misma película. Escribí un query que retorne los nombres del actor, el título de la película y el número de roles (siempre debería ser > 5).

-- agrupar por actor y por pelicula para contar los roles

-- actors - roles - movies
-- nombre           título

SELECT a.first_name, a.last_name, m.name, COUNT(DISTINCT role) as total_roles
FROM actors as a
JOIN roles as r ON a.id = r.actor_id
JOIN movies as m ON r.movie_id = m.id
WHERE m.year > 1990
GROUP BY a.id, m.id
HAVING COUNT(DISTINCT role) > 5; --la query tarda

--12.Para cada año, contá el número de películas en ese años que sólo tuvieron actrices femeninas.
--paso 1 busco las películas dónde actúan hombres

--actors - roles

SELECT r.movie_id
FROM roles as r 
JOIN actors as a ON r.actor_id = a.id
WHERE a.gender = 'M'
LIMIT 5;

--paso 2 traigo cada película que no esté en ese listado

SELECT year, COUNT(DISTINCT id) as total
FROM movies
WHERE id NOT IN (
  SELECT r.movie_id
  FROM roles as r 
  JOIN actors as a ON r.actor_id = a.id
  WHERE a.gender = 'M'
)
GROUP BY year
ORDER BY year DESC; --la query tarda

