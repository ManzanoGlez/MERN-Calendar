const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const register = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        //Validations

        let uniqueUser = await User.findOne({ email });

        if (uniqueUser) {
            return res.status(400).json({
                ok: false,
                msg: "El email registrado ya existe",
            });
        }

        const user = new User(req.body);

        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());

        const docUser = await user.save();

        const access_token = await generateJWT(user);

        return res.status(201).json({
            ok: true,
            user: {
                uid: user.id,
                name: user.name,
            },
            access_token,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, en breve lo soluciónaremos",
        });
    }
};

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            if (await bcrypt.compareSync(password, user.password)) {
                const access_token = await generateJWT(user);

                return res.status(200).json({
                    ok: true,
                    user: {
                        uid: user.id,
                        name: user.name,
                        email: user.email,
                    },
                    access_token,
                });
            }
        }

        return res.status(400).json({
            ok: false,
            msg: "Usuario/contraseña incorrecta",
        });
    } catch (error) {
        console.warn(error);

        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, en breve lo soluciónaremos",
        });
    }
};

const renew = async (req, res = response) => {
    
    const { uid, name, email } = req.auth_user;

    const user = { id:uid, name, email };

    const access_token = await generateJWT(user);
    return res.json({ ok: true, user, access_token });
};

module.exports = {
    register,
    login,
    renew,
};
