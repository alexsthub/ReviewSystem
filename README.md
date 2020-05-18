# ReviewSystem

The main purpose of this project was to further familiarize myself with typescript, express, and unit tests to build a simple product review CRUD server. Users are allowed to view and add products and reviews. I was mainly focusing on the backend so I added a extremely simple client to view these products and reviews with authentication carried by Firebase. <br/>
<br/>
To run the unit tests for the server, cd into the tests directory and run: `bash test.sh`. This will spin up a new mysql docker container to perform tests on. The container needs about 15 seconds to start up so there is some wait time to run the tests. <br/>
<br/>
To start the server, run: `npm start` from the home directory. If you made any changes, make sure to run `tsc` to compile the typescript into javascript before running the start command. To start the client, cd into the client directory and run: `npm start`.
