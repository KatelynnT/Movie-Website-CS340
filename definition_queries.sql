-------------------------------------------------------
-- DATA DEFINITION QUERIES
-------------------------------------------------------
--Query for creating User table

create table users (
  user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  CONSTRAINT user_login UNIQUE(username, password)
);

--Query for creating Admin table

create table admin (
  admin_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  admin_username varchar(255) NOT NULL,
  admin_password varchar(255) NOT NULL,
  CONSTRAINT admin_login UNIQUE(admin_username, admin_password)
);

--Query for creating Visual Media table

create table visual_media (
  vm_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  vm_title varchar(255) NOT NULL,
  summary varchar(10000) NOT NULL,
  episodes int(11),
  seasons int(11),
  img_url varchar(1000) NOT NULL,
  aid int(11),
  foreign key(aid) references admin(admin_id)
);

--Query for creating Review table

create table review (
   review_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   review_movie_tv varchar(255) NOT NULL,
   review_title varchar(255) NOT NULL,
   review_body varchar(10000) NOT NULL,
   uid int(11),
   vid int(11),
   foreign key(uid) references users(user_id),
   foreign key(vid) references visual_media(vm_id)
);

--Query for creating searches_for table

create table searches_for (
  uid int(11),
  vid int(11),
  foreign key(uid) references users(user_id),
  foreign key(vid) references visual_media(vm_id),
  primary key (uid, vid)
);

-------------------------------------------------------
-- SAMPLE DATA
-------------------------------------------------------

--Insert data for users:

INSERT INTO users (username, password)
VALUES ('KatelynnT', 'gertisthename');

INSERT INTO users (username, password)
VALUES ('KateG', 'cubanosarelife');

INSERT INTO users (username, password)
VALUES ('LaurenG', 'baloohastoliveonsomeway');

INSERT INTO users (username, password)
VALUES ('SheldonR', 'bunny87');

INSERT INTO users (username, password)
VALUES ('GossipGirl', 'xoxo');

INSERT INTO users (username, password)
VALUES ('Placebos', 'gazebos');

INSERT INTO users (username, password)
VALUES ('PetyrVamp', 'chickensplease');

INSERT INTO users (username, password)
VALUES ('Ed', 'itriedcalling');

INSERT INTO users (username, password)
VALUES ('XXXanderXXX', 'greasyhairdontcare');

INSERT INTO users (username, password)
VALUES ('QuarantineCutie', 'covid19');

--Insert data for admin:

INSERT INTO admin (admin_username, admin_password)
VALUES ('KThorn', '234503');

INSERT INTO admin (admin_username, admin_password)
VALUES ('LGalle', '897899');

INSERT INTO admin (admin_username, admin_password)
VALUES ('KGalle', 'dfhk80');

INSERT INTO admin (admin_username, admin_password)
VALUES ('SRoberts', 'lsdkfj90');

INSERT INTO admin (admin_username, admin_password)
VALUES ('JDoe', '9023eh');

INSERT INTO admin (admin_username, admin_password)
VALUES ('SSmith', 'lpfi90');

INSERT INTO admin (admin_username, admin_password)
VALUES ('HBarry', 'dkfj79');

INSERT INTO admin (admin_username, admin_password)
VALUES ('MLee', '29038jl');

INSERT INTO admin (admin_username, admin_password)
VALUES ('LTims', '83oieh8');

INSERT INTO admin (admin_username, admin_password)
VALUES ('BBao', 'kej803');

--Insert data for visual_media:

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('Star Wars: Episode IV - A New Hope', 'A long time ago in a galazy far, far away....', NULL, NULL, 'https://images-na.ssl-images-amazon.com/images/I/A1wnJQFI82L._AC_SY879_.jpg');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('Goonies', 'Strange treasure hunt with lovable monster and some good friends', NULL, NULL, 'https://images-na.ssl-images-amazon.com/images/I/515DYf99zfL._AC_.jpg');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('Chef', 'Foodtruck + family + good times = life goals', NULL, NULL, 'https://images-na.ssl-images-amazon.com/images/I/51vmy%2BBKmrL._AC_.jpg');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('Back to the Future', 'Apparently we are supposed to have hoverboards already', NULL, NULL, 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9d8e73e436b536a7c81644c6e9877c7a_1c9d0f90-9991-4326-8f37-3dd980abeacf_240x360_crop_center.progressive.jpg?v=1573590262');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('Good Boys', 'Just some innocent boys trying to get back their drone..S.C.A.B.', NULL, NULL, 'https://images-na.ssl-images-amazon.com/images/I/41w8QqdT4zL._AC_SY445_.jpg');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('Finding Nemo', 'The search for orange lil fish', NULL, NULL, 'https://prodimage.images-bn.com/pimages/0786936826302_p0_v2_s550x406.jpg');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('New Girl', 'Strange girl moves in, befriends everyone, and Prince shows up once', 146, 7, 'https://vignette.wikia.nocookie.net/newgirl/images/b/bd/New_girl_season_4_2.jpg/revision/latest?cb=20140731072024');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('Friends', 'Six people drink a lot of coffee and get into a lot of relationships', 236, 10, 'https://vignette.wikia.nocookie.net/nbc/images/e/e8/Friends_poster.jpg/revision/latest?cb=20180526033743');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('The Office', 'Workplace shenanigans turned into wholesome life lessons', 188, 9, 'https://images-na.ssl-images-amazon.com/images/I/615MPacH9qL._AC_SY741_.jpg');

INSERT INTO visual_media  (vm_title, summary, episodes, seasons, img_url)
VALUES ('It', 'Murderous clown dances funny', NULL, NULL, 'https://images-na.ssl-images-amazon.com/images/I/61bMkkwpduL._AC_SY741_.jpg');

--Insert data for Review:

INSERT INTO review (review_title, review_body, vid, review_movie_tv) VALUES ('New Girl? Boring girl!', 'This show had me falling asleep standing up. Zooey Deschanel? More like BOOey!', 9, 9);

INSERT INTO review (review_title, review_body, vid, review_movie_tv) VALUES ('Wish this was real life!', '20-somethings with great jobs and an incredible apartment in NYC...like that is real', 10, 10);

INSERT INTO review (review_title, review_body, vid, review_movie_tv) VALUES ('Post Malone Wrote This', 'Man I love paper like I am Michael Scott', 11, 11);

INSERT INTO review (review_title, review_body, vid, review_movie_tv)
VALUES ('May the Force Be With You', 'Man, I wish they would make like 8 more of these!!', 4, 4);

INSERT INTO review (review_title, review_body, vid, review_movie_tv)
VALUES ('Got myself a new dance movie and catch phrase', 'Can you say "Hey you guyyyyyss" and do the truffle shuffle at the same time?', 3, 3);

INSERT INTO review (review_title, review_body, vid, review_movie_tv)
VALUES ('Better than Ratatouille', 'There are only two cooking movies worth talking about and this one is top of the menu', 5, 5);

INSERT INTO review (review_title, review_body, vid, review_movie_tv)
VALUES ('10/10 Red Balloons', 'I wanna float too', 12, 12);

INSERT INTO review (review_title, review_body, vid, review_movie_tv)
VALUES ('This movie SHORE is great', 'Did you SEA what I did there?', 8, 8);

INSERT INTO review (review_title, review_body, vid, review_movie_tv)
VALUES ('Not realistic', 'If only this could actually happen', 6, 6);

INSERT INTO review (review_title, review_body, vid, review_movie_tv)
VALUES ('One of my faves!', 'I do not understand why anyone would not love this show', 9, 9);

INSERT INTO review (review_title, review_body, vid, review_movie_tv)
VALUES ('Worth the watch!', 'I really loved the plot of this movie!', 5, 5);

--Insert data for searches_for:

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'KateG'), (SELECT vm_id FROM visual_media WHERE vm_title = 'It'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'LaurenG'), (SELECT vm_id FROM visual_media WHERE vm_title = 'Chef'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'SheldonR'), (SELECT vm_id FROM visual_media WHERE vm_title = 'Goonies'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'GossipGirl'), (SELECT vm_id FROM visual_media WHERE vm_title ='Star Wars: Episode IV - A New Hope'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'PetyrVamp'), (SELECT vm_id FROM visual_media WHERE vm_title = 'The Office'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'XXXanderXXX'), (SELECT vm_id FROM visual_media WHERE vm_title = 'Friends'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'QuarantineCutie'), (SELECT vm_id FROM visual_media WHERE vm_title = 'New Girl'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'KateG'), (SELECT vm_id FROM visual_media WHERE vm_title = 'Back to the Future'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'KatelynnT'), (SELECT vm_id FROM visual_media WHERE vm_title = 'Finding Nemo'));

INSERT INTO searches_for (uid, vid)
VALUES((SELECT user_id FROM users WHERE username = 'QuarantineCutie'), (SELECT vm_id FROM visual_media WHERE vm_title = 'Goonies'));

