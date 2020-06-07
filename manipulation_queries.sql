-------------------------------------------------------
-- MANIPULATION QUERIES
-------------------------------------------------------

--Queries for login page

SELECT user_id as id, username, password FROM users;
SELECT user_id as id FROM users WHERE users.username LIKE " + mysql.pool.escape(req.body.username);
SELECT user_id as id FROM users WHERE users.password LIKE " + mysql.pool.escape(req.body.password);

--Queries for login error page

SELECT user_id as id, username, password FROM users;
SELECT user_id as id FROM users WHERE users.username LIKE " + mysql.pool.escape(req.body.username);
SELECT user_id as id FROM users WHERE users.password LIKE " + mysql.pool.escape(req.body.password);

--Queries for signup page

SELECT user_id as id, username, password FROM users;
INSERT INTO users (username, password) VALUES (?,?);

--Queries for admin login page

SELECT admin_id as id, admin_username, admin_password FROM admin;
SELECT admin_id as id FROM admin WHERE admin.admin_username LIKE " + mysql.pool.escape(req.body.admin_username);
SELECT admin_id as id FROM admin WHERE admin.admin_password LIKE " + mysql.pool.escape(req.body.admin_password);

--Queries for admin error page

SELECT admin_id as id, admin_username, admin_password FROM admin;
SELECT admin_id as id FROM admin WHERE admin.admin_username LIKE " + mysql.pool.escape(req.body.admin_username);
SELECT admin_id as id FROM admin WHERE admin.admin_password LIKE " + mysql.pool.escape(req.body.admin_password);

--Queries for search page

SELECT vm_title, seasons, episodes, summary, img_url FROM visual_media WHERE visual_media.vm_title LIKE " + mysql.pool.escape(req.params.s);
SELECT user_id as id, username FROM users;

--Queries for search result page

SELECT vm_title, seasons, episodes, summary, img_url FROM visual_media WHERE visual_media.vm_title LIKE " + mysql.pool.escape(req.params.s);
SELECT user_id as id, username FROM users;

--Queries for admin page

SELECT vm_id as id, vm_title, seasons, episodes, summary FROM visual_media;
SELECT vm_id as id, vm_title, summary, episodes, seasons, img_url FROM visual_media WHERE vm_id = ?;
INSERT INTO visual_media (vm_title, seasons, episodes, summary, img_url) VALUES (?,?,?,?,?);
DELETE FROM posts WHERE vid = ?;
DELETE FROM searches_for WHERE vid= ?;
DELETE FROM review WHERE vid= ?;
DELETE FROM visual_media WHERE vm_id= ?;

--Queries for update media page

SELECT vm_id as id, vm_title, seasons, episodes, summary FROM visual_media;
SELECT vm_id as id, vm_title, summary, episodes, seasons, img_url FROM visual_media WHERE vm_id = ?;
UPDATE visual_media SET vm_title=?, summary=?, episodes=?, seasons=?, img_url=? WHERE vm_id=?;
INSERT INTO visual_media (vm_title, seasons, episodes, summary, img_url) VALUES (?,?,?,?,?);

--Queries for review page

SELECT review_id as id, vid, review_title, review_body, visual_media.vm_title AS review_movie_tv FROM review INNER JOIN visual_media ON review.review_movie_tv = visual_media.vm_id;
SELECT review_id as id, review_movie_tv, review_title, review_body FROM review WHERE review_id = ?;
SELECT review_id as id, review_movie_tv, review_title, review_body FROM review  WHERE review.review_movie_tv LIKE " + mysql.pool.escape(req.params.s);
DELETE FROM review WHERE review_id = ?;

--Queries for update review page

SELECT review_id as id, review_movie_tv, review_title, review_body FROM review;
SELECT review_id as id, review_movie_tv, review_title, review_body FROM review WHERE review_id = ?;
UPDATE review SET review_movie_tv=?, review_title=?, review_body=? WHERE review_id=?;
SELECT review_id as id, review_movie_tv, review_title, review_body FROM review  WHERE review.review_movie_tv LIKE " + mysql.pool.escape(req.params.s);

--Queries for posts page

SELECT review.review_id as id, review.review_movie_tv, review.review_title, review.review_body, vid FROM review;
INSERT INTO review (review_title, review_body, vid, review_movie_tv) VALUES (?,?,?,?);
SELECT vm_id, vm_title FROM visual_media;

--Queries for visual media page

SELECT vm_title, summary, img_url  FROM visual_media;

--Queries for specific visual media review page

SELECT review_id as id, review_movie_tv, review_title, review_body FROM review;
SELECT review_id as id, review_movie_tv, review_title, review_body FROM review WHERE review_id = ?;
SELECT review_id as id, review_movie_tv, review_title, review_body FROM review  WHERE review.review_movie_tv LIKE " + mysql.pool.escape(req.params.s);
DELETE FROM review WHERE review_id = ?;

-------------------------------------------------------
-- TRIGGERS, FUNCTIONS,  AND PROCEDURES
-------------------------------------------------------

--This is a trigger that checks if the seasons and episodes are 0. The seasons and episodes will be set to NULL because this shows that the admin entered a movie, not a TV show. The movies do not have seasons or episodes. 

CREATE TRIGGER before_visual_media_update
AFTER UPDATE ON visual_media
FOR EACH ROW
BEGIN
  IF NEW.seasons = 0 THEN
    SET NEW.seasons = NULL;
  END IF;
  IF NEW.episodes = 0 THEN
    SET NEW.episodes = NULL;
  END IF;
END;

--This is a procedure that prints the review title and review body. The procedure selects the title and body and prints it all out at once. 

CREATE PROCEDURE printReview(in identifier int)
BEGIN
  DECLARE title varchar(225);
  DECLARE body text;

  SET title = NULL;
  SET body = NULL;

  SELECT review_title into title from review where review_id = identifier;
  SELECT review_body into body from review where review_id = identifier;

  SELECT concat(title, '\n', body);
  END;

--This procedure selected the username and password from a user. A temporary table is made to store this information and then the information is selected from this temporary table. 

CREATE PROCEDURE UserCursor()
BEGIN
    DECLARE name varchar(255);
    DECLARE pass varchar(255);
    DECLARE no_more_data boolean default false;
    DECLARE cursor1 CURSOR for SELECT username, password FROM users;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET no_more_data = true;

    DROP TEMPORARY TABLE IF EXISTS tempTable;
    CREATE TEMPORARY TABLE tempTable(myline TEXT);

    OPEN cursor1;

    myLoop: WHILE(no_more_data = false) DO
              FETCH cursor1 INTO username, password;
              IF(no_more_data) THEN
                CLOSE cursor1;
                leave myLoop;
              END IF;

              INSERT INTO tempTable values(concat(username, ' ', password));

              END WHILE;

    SELECT * FROM tempTable;
  END;

--This function is used to return the user login information. It’s not being used to update or insert or delete. It’s only returning the user login, which is composed of the username and password of a user.

CREATE FUNCTION getUserLogin (us_id INT)
RETURNS VARCHAR(255)
BEGIN
  declare user_login varchar(255);
  select concat (Uname, ' ', Pword) into user_login
  from users where user_id = us_id;

  if ROW_COUNT() = 0 then 
    return 'n/a.';
  else
    return user_login
  end if;
END

