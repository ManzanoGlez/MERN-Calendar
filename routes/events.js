/*
 endpoint = /api/auth + route
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const paramsValidator = require("../app/middlewares/validateParams");
const { validateJWT } = require("../app/middlewares/validateJWT");
const { isDate } = require("../app/helpers/validations");

const {
    create,
    show,
    update,
    destroy,
    paginate,
} = require("../app/controllers/EventController");
 
router.use(validateJWT);

router.post(
    "/",
    [
        check("title", "El campo titulo es requerido.").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom(isDate),
        check("end", "Fecha de finalización es obligatoria").custom(isDate),
        paramsValidator,
    ],
    create
);
router.get("/", [paramsValidator], show);
router.get("/paginate", [paramsValidator], paginate);

router.put("/:id", [paramsValidator], update);
router.delete("/:id", [paramsValidator], destroy);

module.exports = router;
