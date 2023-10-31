SELECT movies.movie_name AS movie, reviews.reviews
FROM reviews
RIGHT JOIN movies
ON reviews.movie_id = movies.movie_id
ORDER BY movies.movie_name;

SELECT movies.movie_name AS movie, reviews.review
FROM movies
LEFT JOIN reviews
ON reviews.movie_id = movie.id
ORDER BY movies.movie_name;


SELECT  FROM movies 