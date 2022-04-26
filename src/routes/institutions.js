const express = require('express');
const crud = require('../controllers/crud');
const router = express.Router();

router.get('/', async function (request, response) {
    try {
        const institutions = await crud.Get(request.models.Institution);
        response.json(institutions);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    }
});

router.post('/', async function (request, response) {
    try {
        const institution = await crud.Add(request.models.Institution, request.body);
        response.json(institution);
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
});

router.delete('/:institutionId', async function (request, response) {
    try {
        await crud.Delete(request.models.Institution, request.params.institutionId);
        response.sendStatus(200);
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
});

router.put('/:institutionId', async function (request, response) {
    try {
        const institution = await crud.Update(request.models.Institution, request.body);
        response.json(institution);
    } catch (err) {
        console.error(err);
        response.sendStatus(500);
    }
});

module.exports = router;
