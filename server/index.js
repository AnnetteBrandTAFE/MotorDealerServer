const motorDealers = require('./data/Motor-Dealers.json');
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const server = express();
//const storage = require('node-persist');

server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

server.get('/home', (request, response) => {
    response.send(`This is the home route, and your port is ${port}`);
})

server.get('/api/motorDealers', (request, response) => {
    response.json(motorDealers);
})
// posts new dealers into json data
server.post('/api/motorDealers', (request, response) => {
    try {
        let name = request.body.name.trim();
        let street = request.body.street.trim();
        let suburb = request.body.suburb.trim();
        let state = request.body.state.trim();
        let postcode = request.body.postcode.trim();
        let phone = request.body.phone.trim();
        let email = request.body.email.trim();
        let dpName = request.body.dpName.trim();
        let dpPhone = request.body.dpPhone.trim();
        let dpEmail = request.body.dpEmail.trim();
        let saName = request.body.saName.trim();
        let saPhone = request.body.saPhone.trim();
        let saEmail = request.body.saEmail.trim();

        let highest = 0;
        for (let i = 0; i < motorDealers.length; i++) {
            if (motorDealers[i].id > highest) {
                highest = motorDealers[i].id;
            }
        }

    // creating a new instance of the dealer object
        let address = { street, suburb, state, postcode }
        let dealerPrincipal = { dpName, dpPhone, dpEmail }
        let securityAdmin = { saName, saPhone, saEmail }
        let d = { id: ++highest, name, address, phone, email, dealerPrincipal, securityAdmin };
        //this will only add the new dealer object to the collection of json object in memory, it will not update the file
        motorDealers.push(d);
        // this will display the info it everything is good
        response.json({ motorDealers: d, status: 200 });
    }
    catch (error) {
        // this will display if there is an error with the info provided
        response.json({ status: 500, message: error.message });
    }

})

const port = 4000;

server.listen(port, () => {
    console.log('The server is up and running and listening on port ' + port);
})