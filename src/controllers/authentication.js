const bcrypt = require('bcryptjs');

async function authenticate(models, { email, password }) {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User does not exist');
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        throw new Error('Passwords do not match');
    }
    if (user.type === 'Admin') {
        return { id: user.id, email: user.email, type: user.type, lawyer: { id: null } };
    }

    const lawyer = await models.Lawyer.findOne({ where: { UserId: user.id } });
    return { id: user.id, email: user.email, type: user.type, lawyer: lawyer.get({ plain: true }) };
}

module.exports = {
    authenticate
};
