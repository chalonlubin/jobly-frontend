# Jobly

Jobly is a job-search application that allows users to signup, login, search for companies/jobs, and apply to jobs.

[Backend Here](https://github.com/chalonlubin/jobly-backend)  

[Demo Here](https://jobly-cl.netlify.app/), deployed with Netlify & Railway.  

**Login**: _guest_ | **Password**: _password_

## 🧐 Motivation & Challenges


> My major motivation with the frontend was to learn more about React, especially different hooks like useState, useEffect, useContext and useParams. I also wanted to try to convert the code to TypeScript after I had time to work on it alone after my bootcamp ended. (The frontend was originally built in a 3.5 day sprint as pairs @ Rithm School). I was also really excited to explore authorization and authentication via token and local storage. I didn't focus so much on CSS, so it is a fairly bare bones app stylistically.
>
> As far as challenges, figuring out the TypeScript conversion was a struggle at first, as I wasn't sure exactly how deep I should go with typing. I used strict mode as my guide, and learned some new things about TypeScript as a whole. Another challenge was staying organized as we worked through the application. What helped immensely was building a component diagram.  

## 💻 Tech Stack & Packages

**JavaScript | TypeScript | React | Bootstrap | React Testing Library |Jest**

_react-dom | react-router-dom | axios | jsonwebtoken | react-toastify_

## ⭐️ Features


Here is a high level overview a few of the features I am proud of:

- Authentication and authorization handled in a secure way via local storage and jsonwebtoken validation
- Passes TypeScript strict mode
- Varied uses of React Hooks

## 📦 Install & Run

```shell

--- clone repo ---
cd into repo
npm install
npm start

Will be running on localhost 3000.
```

## 🧪 Testing

```shell
$ npm i --global jest (this is a global install, ignore if you have)

--- JEST COMMANDS ---
jest -i (runs all tests)
jest --coverage (shows coverage of app)
jest {name_of_file}.test.js (to run specific file)

```

### ☑️ To-Do's

- Add testing
- Add authO for login with google / indeed
- Add company login option, to post jobs and view applications
- Add a way to hold a resume / CV for frequent use
- Update styling to look presentable
- Pagination, infinite scroll
- Connect the application feature

## 👉 Credits

> Jobly was built while attending Rithm School as part of a 6 day sprint (3 days for front and backend each). The frontend was built with @yukdev and backend was built with @meyerj. It was refactored after graduation, for efficiency and general code cleanup.

## ⚖️ License


```
Copyright [2023] [Chalon Lubin]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```


