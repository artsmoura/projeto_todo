const express = require('express');

const router = express.Router();

const TaskController = require('../controller/TaskController');

const TaskValidation = require('../middlewares/TaskValidation');

const MacaddressValidation = require('../middlewares/MacValidation');

router.post('/', TaskValidation, TaskController.create);

router.put('/:id', TaskValidation, TaskController.update);
router.put('/:id/:done', TaskController.updateDone);

router.delete('/:id', TaskController.deleteTask);

router.get('/:id', TaskController.show);
router.get('/filter/listAll', MacaddressValidation, TaskController.listAll);
router.get('/filter/lateTask', MacaddressValidation, TaskController.lateTask);
router.get('/filter/todayFilter', MacaddressValidation, TaskController.todayFilter);
router.get('/filter/weekFilter', MacaddressValidation, TaskController.weekFilter);
router.get('/filter/monthFilter', MacaddressValidation, TaskController.monthFilter);
router.get('/filter/yearFilter', MacaddressValidation, TaskController.yearFilter);

module.exports = router;