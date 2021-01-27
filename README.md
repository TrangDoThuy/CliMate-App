# CliMate-App
## High Level Design

## NLP design
### Input data: 
+ You can run file get_data.py to get the data from NewsAPI. Please change the key API in url link to your key API if exceed the limit :))

https://newsapi.org/

### 2 main points:
+ classification: ? how can we label articles

+ chatbot: answer questions related to environment and climate change

Based on https://github.com/deepset-ai/haystack
https://haystack.deepset.ai/docs/latest/documentstoremd
### Output:
Use FastAPI to send data to mobile app backend

[
![Screenshot 2020-12-29 123610](https://user-images.githubusercontent.com/30380242/105354141-1922eb00-5c2b-11eb-8008-de6b0edebf83.jpg)
](url)

## Mobile app part:
### 1. Environment set up:

#### Node.js: https://nodejs.org/en/ for backend part
#### VS Code: https://code.visualstudio.com/ for text editor

We may need some extensions for better programming:

- Bracket Pair Colorizer
- ES7 React/Redux/GraphQL/React-Native snippets
- Prettier
#### git: https://git-scm.com/
#### Postman: https://www.postman.com/ to test API for backend
#### React Developer Tools: from chrome web store, when our project has website version
#### Redux DevTools: from chrome web store, to show whole application
#### Git Bash: for window user if you like

### 2. Database: MongoDB

We're using a cloud database

- Install Mongoose package with NPM to interact with database

### 3. Install dependencies and Setup Express

- Type `npm init` in terminal in VSCode





