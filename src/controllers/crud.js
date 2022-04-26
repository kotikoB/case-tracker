async function Get(model) {
    try {
        return model.findAll();
    } catch (err) {
        throw new Error(err);
    }
}

async function Add(model, data) {
    try {
        return await model.create(data);
    } catch (err) {
        throw new Error(err);
    }
}

async function Update(model, data) {
    const { id } = data;
    try {
        await model.update(data, {
            where: {
                id
            }
        });
        return await model.findOne({
            where: {
                id
            }
        });
    } catch (err) {
        throw new Error(err);
    }
}

async function Delete(model, id) {
    try {
        const data = await model.destroy({
            where: {
                id
            }
        });
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    Add,
    Get,
    Update,
    Delete
};
