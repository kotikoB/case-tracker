const express = require('express');
const crud = require('../controllers/crud');
const schematic = require('../schematic');
const add = require('date-fns/add');
const isBefore = require('date-fns/isBefore');
const router = express.Router();

router.get('/', async function (request, response) {
    const { lawyerId } = request.claims;
    const { models } = request;
    let cases = [];
    if (lawyerId === null) {
        cases = await models.Case.findAll({ include: models.Lawyer });
    } else {
        cases = await models.Case.findAll({ where: { LawyerId: lawyerId }, include: models.Lawyer });
    }
    if (cases) {
        const resp = cases.map((data) => {
            console.log(data.id, data.stage)
            const dueDate = add(data.createdAt, {
                days: schematic[data.stage].days
            });
            const plain = data.get({ plain: true });
            plain.stage = schematic[data.stage].desc;
            plain.stageKey = data.stage
            plain.dueDate = dueDate;
            plain.isDue = isBefore(dueDate, new Date());
            return plain;
        });

        response.json(resp);
        return;
    }
    response.sendStatus(400);
});

router.post('/', async function (request, response) {
    const { userId, lawyerId } = request.claims;
    if (lawyerId === null) {
        const data = await crud.Add(request.models.Case, request.body);

        const plain = data.get({ plain: true });
        plain.Lawyer = await data.getLawyer();
        console.log('****', data.stage, request.body.stage);
        const dueDate = add(data.createdAt, {
            days: schematic[data.stage].days
        });
        plain.stageKey = data.stage;
        plain.stage = schematic[data.stage].desc;
        plain.dueDate = dueDate;
        plain.isDue = isBefore(dueDate, new Date());
        response.json(data);
    } else {
        response.sendStatus(403);
    }
});

router.delete('/:caseId', async function (request, response) {
    const { userId, lawyerId } = request.claims;
    console.log(request.params.caseId);
    if (lawyerId === null) {
        await crud.Delete(request.models.Case, request.params.caseId);
        response.sendStatus(200);
    } else {
        response.sendStatus(403);
    }
});

router.put('/:caseId', async function (request, response) {
    const { userId, lawyerId } = request.claims;
    const { models } = request.models;
    if (lawyerId === null) {
        const data = await crud.Update(request.models.Case, request.body);
        const plain = data.get({ plain: true });
        plain.Lawyer = await data.getLawyer();
        const dueDate = add(data.createdAt, {
            days: schematic[data.stage].days
        });
        plain.stageKey = data.stage;
        plain.stage = schematic[data.stage].desc;
        plain.dueDate = dueDate;
        plain.isDue = isBefore(dueDate, new Date());
        response.json(plain);
    } else {
        response.sendStatus(403);
    }
});

module.exports = router;
