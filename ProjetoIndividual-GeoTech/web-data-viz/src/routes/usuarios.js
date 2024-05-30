var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
})
router.post("/mensagem", function (req, res) {
    usuarioController.mensagem(req, res);
})

router.post("/memory1", function (req, res) {
    usuarioController.memory1(req, res);
})

router.post("/memory2", function (req, res) {
    usuarioController.memory2(req, res);
})

router.post("/quiz", function (req, res) {
    usuarioController.quiz(req, res);
})

router.post("/pais", function (req, res) {
    usuarioController.pais(req, res);
})

router.post("/flag", function (req, res) {
    usuarioController.flag(req, res);
})

router.post("/forca", function (req, res) {
    usuarioController.forca(req, res);
})
router.post("/feedback", function (req, res) {
    usuarioController.feedback(req, res);
});

module.exports = router;