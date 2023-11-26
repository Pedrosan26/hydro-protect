const express = require('express');
const flowController = require('../controllers/flowController');
const phController = require('../controllers/phController');
const timeController = require('../controllers/timeController');
const tecladoController = require('../controllers/tecladoController');
const ultraSonicoController = require('../controllers/ultraSonicoController');


const router = express.Router();


router.get('/api/getLogsTeclado/:deviceID', tecladoController.getLogsTeclado);
router.post('/api/logTeclado/:deviceID/:char', tecladoController.logTeclado);
router.get('/api/getLogsFlujo/:deviceID', flowController.getLogsFlujo);
router.post('/api/logFlujo/:deviceID/:valvula/:flujo', flowController.logFlujo);
router.get('/api/getLogsPh/:deviceID',phController.getLogsPh);
router.post('/api/logPh/:deviceID/:ph/:pastilla',phController.logPh);
router.get('/api/getLogsTime/:deviceID',timeController.getLogsTime);
router.post('/api/logTime/:deviceID/:buzzer/:time',timeController.logTime);
router.get('/api/getLogsUltraSonico/:deviceID',ultraSonicoController.getLogsUltraSonico);
router.post('/api/logUltraSonico/:deviceID/:dist/:led',ultraSonicoController.logUltraSonico);

module.exports = router;