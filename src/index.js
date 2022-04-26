const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const lawyers = require('./routes/lawyers');
const users = require('./routes/users');
const cases = require('./routes/cases');
const institutions = require('./routes/institutions');
const { connect, getModels } = require('./repository');
const { authenticate } = require('./controllers/authentication');
const { createToken, verifyToken } = require('./token');
const schematic = require('./schematic');

app.use(cors());
app.use(bodyParser.json());

app.use(function attachModels(request, response, next) {
    request.models = getModels();
    next();
});

app.get('/schematic', function (request, response) {
    response.json(schematic);
});

app.post('/authenticate', function (request, response) {
    const { body, models } = request;
    authenticate(models, body)
        .then((data) => {
            const claims = { userId: data.id, lawyerId: data.lawyer.id };
            const token = createToken(claims);
            response.json({ token, role: data.type });
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(401);
        });
});

app.use('/users', users);

app.use(function auth(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        console.log('Error: Authorization:Empty', request.headers);
        response.sendStatus(401);
        return;
    }
    try {
        const claims = verifyToken(authorization);
        request.claims = claims;
    } catch (err) {
        console.log('Error: VerifyToken', err);
        response.sendStatus(401);
        return;
    }
    next();
});

app.use('/lawyers', lawyers);
app.use('/cases', cases);
app.use('/institutions', institutions);

app.use('/lawyers', lawyers);
app.use('/cases', cases);
app.use('/users', users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function listen() {
    console.log('SERVER: started on port', PORT);
    setTimeout(connect, 1000);
});
