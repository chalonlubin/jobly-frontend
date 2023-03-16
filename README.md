# Jobly

Mock job search application. 

Built in 6 days as part of two seperate sprint w/ @yukdev on the front end and @meyburdj on the back end while attending Rithm School.

Backend Repo: https://github.com/chalonlubin/jobly-backend

Demo: https://jobly-ccl.surge.sh/

Test Login: testuser/password

---

## Features
- RESTful API with Node.js and Express, containing database models with backend data validation via JSON schemas
- Managed authorization and authentication by utilizing middleware with JSON web tokens and password encryption with BCrypt
- Functional frontend built with React


## Environment Setup
(Frontend)
```
clone repo
npm install
npm start

Will be running on localhost 3000.
```

(Backend)
```
clone repo
psql -f jobly.sql jobly
npm install
npm start

Will be running on localhost 3001.
```
---

## Tech

Node.js | Express | SQL | Postgres | React.js | HTML | CSS | Bootstrap


## // TODO
- UX / UI improvments
- User messaging interface, possibly with websocket
- Pagination
- Add application functionality
- Add edit form for companies
- Add company login and view applications
- Additional tests for both front and backend






