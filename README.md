# Checkpoints Frontend

A simple app to save and persist markers on a Google Map.

## Quick Start

### Run Project
1. Make sure the backend is running on `localhost:8080`
2. `yarn install` or `npm install`
3. `yarn start` or `npm run start`
4. Project should open in `localhost:3000`

### Run tests
1. `yarn test` or `npm test`

## How I did it

This project was bootstrapped using Create React App.

### Tech Stack
- `styled-components` for styling.
- `jest`, `enzyme`, and `react-testing-library` for testing.
- The queries are made with simple `fetch()` requests.
- While it's not a library, I'm also using `React Hooks` extensively.
- In order to load Google Maps I'm using `react-google-maps`. It's a somewhat OK library to load the `Maps API` easily in a React App.

I also had to get a Google API Key which is stored in the `constants` folder. This has the unfortunate disadvantage of limiting the amount of requests in a short time. Because of this, you will receive an error if you refresh the page too often. Refreshing after waiting a bit should solve that problem.