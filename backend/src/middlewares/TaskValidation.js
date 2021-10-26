const TaskModel = require('../model/TaskModel');

const TaskValidation = async (req, res, next) => {
    const { macaddress, type, title, description, when } = req.body;
    now = new Date;

    if (!macaddress) {
        return res.status(400).json({ erro: 'MacAdress is required' });
    } else if (!type) {
        return res.status(400).json({ erro: 'Type is required' });
    } else if (!title) {
        return res.status(400).json({ erro: 'Title is required' });
    } else if (!description) {
        return res.status(400).json({ erro: 'Description is required' });
    } else if (!when) {
        return res.status(400).json({ erro: 'Date and time is required' });
    } else if ((new Date(when)) < now) {
        return res.status(400).json({ erro: 'Date and time can not be in the past' });
    } else {
        let exists;

        if (req.params.id) {
            exists = await TaskModel.findOne(
                {
                    '_id': { '$ne': req.params.id },
                    'when': { '$eq': new Date(when) },
                    'macaddress': { '$in': macaddress }
                });
        } else {
            exists = await TaskModel.findOne(
                {
                    'when': { '$eq': new Date(when) },
                    'macaddress': { '$in': macaddress }
                });
        }

        if (exists) {
            return res.status(400).json({ erro: 'This task already exists in this day and time' });
        }

        next();
    }
};

module.exports = TaskValidation;