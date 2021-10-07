# How to run the application

## Front-end
- Install required packages:
```
cd front-end
yarn install
```
- Create .env file including:
  - REACT_APP_GOOGLE: Google API key
  - REACT_APP_API_URL: Backend URL

- Run the front-end application:
```
yarn start
```

## Back-end
- Install required packages:
```
cd back-end
npm install
```
- Create .env file including:
  - PORT: Local port to run the app
  
- Populate the database:
```
node databaseInit.js
```
- Run the back-end application:
```
npm start
```
