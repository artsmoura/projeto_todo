const TaskModel = require('../model/TaskModel');

const dateNow = new Date();

//Inicio do dia e final do dia
var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

var endDate = new Date();
endDate.setUTCHours(23, 59, 59, 999);

//Inicio da semana e final da semana
var first = dateNow.getDate() - dateNow.getDay();
var last = first + 6;

var firtstDayWeek = new Date(dateNow.setDate(first)).toUTCString();
var lastDayWeek = new Date(dateNow.setDate(last)).toUTCString();

//Inicio do mês e final do mês
var firstDayMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).toUTCString();
var lastDayMonth = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).toUTCString();

//Inicio do ano e final do ano
var firstDayYear = new Date(dateNow.getFullYear(), 0, 1).toUTCString();
var lastDayYear = new Date(dateNow.getFullYear(), 11, 31).toUTCString();

class TaskController {


    async create(req, res) {
        const task = new TaskModel(req.body);
        await task
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async update(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async listAll(req, res) {
        await TaskModel.find({ macaddress: { '$in': req.body.macaddress } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async show(req, res) {
        await TaskModel.findById(req.params.id)
            .then(response => {
                if (response) {
                    return res.status(200).json(response);
                } else {
                    return res.status(404).json({ error: 'Task not found' });
                }
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async deleteTask(req, res) {
        await TaskModel.deleteOne({ '_id': req.params.id })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error).status(500).json(error);
    }

    async updateDone(req, res) {
        await TaskModel.findByIdAndUpdate({ '_id': req.params.id }, { 'done': req.params.done }, { new: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async lateTask(req, res) {
        await TaskModel.find({ 'when': { '$lt': dateNow }, 'macaddress': { '$in': req.body.macaddress } })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async todayFilter(req, res) {
        await TaskModel.find({
            'macaddress': { '$in': req.body.macaddress },
            'when': { '$gte': startDate.toUTCString(), '$lte': endDate.toUTCString() }
        })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async weekFilter(req, res) {
        await TaskModel.find({
            'macaddress': { '$in': req.body.macaddress },
            'when': { '$gte': firtstDayWeek, '$lte': lastDayWeek }
        })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async monthFilter(req, res) {
        await TaskModel.find({
            'macaddress': { '$in': req.body.macaddress },
            'when': { '$gte': firstDayMonth, '$lte': lastDayMonth }
        })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async yearFilter(req, res) {
        await TaskModel.find({
            'macaddress': { '$in': req.body.macaddress },
            'when': { '$gte': firstDayYear, '$lte': lastDayYear }
        })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

}

module.exports = new TaskController();