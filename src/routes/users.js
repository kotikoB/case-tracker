const express = require('express');
const bcrypt = require('bcryptjs');
const crud = require('../controllers/crud');
const router = express.Router();

router.post('/', async function (request, response) {
    const data = request.body;
    if (data.password) {
        data.password = bcrypt.hashSync(data.password, 8);
    }

    try {
        const user = await crud.Add(request.models.User, data);
        response.json(user);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

router.post('/admin', async function (request, response) {
    const data = request.body;
    // TODO: Don't do this: find a better way of adding an admin
    const apiKey = 'fea73b52-958e-4b67-9180-b0c5e4399d20';
    if (!data.apiKey || data.apiKey !== apiKey) {
        response.sendStatus(401);
        return;
    }

    if (data.password) {
        data.password = bcrypt.hashSync(data.password, 8);
    }

    try {
        data.type = 'Admin';
        const user = await crud.Add(request.models.User, data);
        response.json(user);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

router.get('/', async function (request, response) {
    try {
        const users = await crud.Get(request.models.User);
        response.json(users);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

router.put('/:userId', async function (request, response) {
    const data = request.body;
    if (data.password) {
        data.password = bcrypt.hashSync(data.password, 8);
    }

    try {
        await crud.Update(request.models.User, data);
        response.json(data);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

router.delete('/:userId', async function (request, response) {
    const { userId } = request.params;
    try {
        await crud.Delete(request.models.User, userId);
        response.sendStatus(200);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

module.exports = router;
