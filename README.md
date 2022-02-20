## Web shop for workshops [![Build](https://github.com/kristiandz/web-shop/actions/workflows/ci.yml/badge.svg)](https://github.com/kristiandz/web-shop/actions) [![CodeFactor](https://www.codefactor.io/repository/github/kristiandz/web-shop/badge)](https://www.codefactor.io/repository/github/kristiandz/web-shop)

This project was built using React in Typscript. This repo includes JSON Server and a db.json file that servers as a mock backend for development.
Currently the code is set to fetch the data from a Firebase REST API and the application is hosted on CentOS/Apache, the live preview is available at https://tinnel-workshops.tk/

## Current status
The required functionality of the application from the user stories has been implemented, all the functions and components should work without problems. At last testing, all the functionalities worked fine on multiple browsers, what is lacking is work to CSS, the application is not responsive to small and medium screens tho, it was built so that it wont take long to implement full responsiveness. A lot of types and interfaces have been skipped with "any" type for easier development.

## TODO
- Responsiveness for all screen sizes
- Run the CSS in autoprefixer for better compatibility
- Implement all interfaces and assign correct types where needed
- Unit testing, integration testing
- Review and optimize the code, find bugs
- Expand the application with the provided design for a different set of user stories ? 


 Development will continue from this point on to finish what I have already planned to complete.
  
## Available Scripts
In the project directory, you can run:
### `npm install`
Clone the repo and then run "npm install" to set the project locally
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### `npm run server`
Runs the JSON server on port [http://localhost:3001](http://localhost:3001)\


## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
