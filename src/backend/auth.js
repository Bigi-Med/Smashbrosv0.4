const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const constants = require('./constants')

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());


app.post('/auth', (req, res) => {
    console.log("received: ",req.body.token);
    if(!req.body.token){
        return res.status(400).send({message: "token expired or not found"}); //not found
    }
    const token = req.body.token;

    jwt.verify(token, constants.TOKEN_SECRETKEY, (err, result) => {
        if(err) {
            console.log("========== err ============");
            console.log(err);
            return res.status(403).send({message: "access forbidden"}); //forbidden
        }
        else {
            console.log("========== res ============");
            console.log(result);
            return res.status(200).send({message: "access to server granted"}); // ok
        }
    });
});


const auth_port = constants.AUTH_PORT;
app.listen(auth_port, () => {
    console.log(`auth-server listening on ${auth_port}`);
});
