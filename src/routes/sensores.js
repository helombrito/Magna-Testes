var express = require("express");
var router = express.Router();


var setorController = require("../controllers/sensoresController");


router.get("/", function (req, res) {
    console.log('Rodando...');
});

router.get("/listar", function (req, res) {
    setorController.pegarTodosSensores(req, res);
});

router.get("/listar/:id", function (req, res) {
    setorController.pegarSensorId(req, res);
});


router.post("/cadastrar", function (req, res) {
    setorController.inserirSensor(req, res);
});



module.exports = router;