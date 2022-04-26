async function Get(model) {
    try {
        return model.findAll();
    } catch (err) {
        throw new Error(err);
    }
}

async function Add(model, user, data) {
    try {
        const lawyer = await model.create(data);
        await user.setLawyer(lawyer);
        return lawyer;
    } catch (err) {
        throw new Error(err);
    }
}

async function Update(model, data) {
    const { id } = data;
    try {
        const lawyer = await model.update(data, {
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
        const lawyer = await model.destroy({
            where: {
                id
            }
        });
        return lawyer;
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
