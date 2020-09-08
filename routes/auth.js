/*
 endpoint = /api/auth + route
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const paramsValidator = require("../app/middlewares/validateParams");
const { register, login, renew } = require("../app/controllers/AuthController");
const { validateJWT } = require("../app/middlewares/validateJWT");

router.post(
    "/register",
    [
        check("email", "El campo email es requerido.").isEmail(),
        check(
            "name",
            "El campo nombre debe contener minimo 5 caracteres y maximo 180"
        ).isLength({ min: 5, max: 180 }),
        check(
            "password",
            "El campo contraseña debe contener minimo 6 caracteres y maximo 60"
        ).isLength({ min: 6, max: 60 }),
        paramsValidator,
    ],
    register
);

router.post(
    "/login",
    [
        check("email", "El campo email es requerido.").isEmail(),
        check(
            "password",
            "El campo contraseña debe contener minimo 6 caracteres y maximo 60"
        ).isLength({ min: 6, max: 60 }),
        paramsValidator,
    ],
    login
);

router.get("/renew", validateJWT, renew);

module.exports = router;
