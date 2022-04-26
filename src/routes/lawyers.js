const express = require('express');
const bcrypt = require('bcryptjs');
const crud = require('../controllers/crud');
const Lawyer = require('../controllers/lawyer');

const router = express.Router();

router.get('/', async function (request, response) {
    try {
        const lawyers = await Lawyer.Get(request.models.Lawyer);
        response.json(lawyers);
    } catch (err) {
        console.log(err);
        response.status(400).send('Bad Request');
    }
});

router.post('/', async function (request, response) {
    try {
        const data = request.body;
        if (data.password) {
            data.password = bcrypt.hashSync(data.password, 8);
        }
        const user = await crud.Add(request.models.User, data);
        const lawyer = await Lawyer.Add(request.models.Lawyer, user, data);
        response.send(lawyer);
    } catch (err) {
        console.error(err.message);
        response.status(400).send('Bad Request');
    }
});

router.delete('/:lawyerId', async function (request, response) {
    const { lawyerId } = request.params;
    try {
        await Lawyer.Delete(request.models.Lawyer, lawyerId);
        response.status(200).send('Lawyer deleted');
    } catch (err) {
        console.error(err.message);
        response.status(400).send('Bad Request');
    }
});

router.put('/:lawyerId', async function (request, response) {
    try {
        const lawyer = await Lawyer.Update(request.models.Lawyer, request.body);
        response.send(lawyer);
    } catch (err) {
        console.error(err.message);
        response.status(400).send('Bad Request');
    }
});

module.exports = router;
