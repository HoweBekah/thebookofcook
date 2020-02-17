CREATE TABLE accounts
(
    account_id SERIAL PRIMARY KEY
  ,
    account_lname text NOT NULL
,
    account_fname text NOT NULL
,
    account_email text NOT NULL
,
    account_password text NOT NULL
);

INSERT INTO accounts
VALUES
    (DEFAULT, 'Howe', 'Bekah', 'bekahhowe@hotmail.com', 'password');

INSERT INTO accounts
VALUES
    (DEFAULT, 'Ruiz', 'Chris', 'bigbutt@butts.com', 'password');