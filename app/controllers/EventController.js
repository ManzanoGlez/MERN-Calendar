const { response } = require("express");
const Event = require("../models/Event");

const create = async (req, res = response) => {
    try {
        const { title, notes, start, end } = req.body;

        req.body.user = req.auth_user.uid;

        const event = new Event(req.body);

        const docEvent = await event.save();

        return res.json({ ok: true, event: docEvent });
    } catch (error) {
        console.warn(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, en breve lo soluciónaremos",
        });
    }
};

const show = async (req, res = response) => {
    const events = await Event.find().populate("user", "name");

    return res.json({ ok: true, events });
};

const paginate = async (req, res = response) => {
    const { page, q } = req.query;

    const query = q ? { title: { $regex: q, $options: "i" } } : {};

    const options = {
        page,
        populate: "user",
        limit: 5,
    };

    const events = await Event.paginate(query, options);

    return res.json({ ok: true, events });
};

const update = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { uid } = req.auth_user;

        const eventExist = await Event.findById(id);

        if (!eventExist || uid !== eventExist.user.toString()) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existente",
            });
        }

        const editEvent = {
            ...req.body,
            user: uid,
        };

        const event = await Event.findByIdAndUpdate(id, editEvent, {
            new: true,
        });

        return res.json({ ok: true, event });
    } catch (error) {
        console.warn(error);

        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, en breve lo soluciónaremos",
            error,
        });
    }
};

const destroy = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { uid } = req.auth_user;

        const eventExist = await Event.findById(id);

        if (!eventExist || uid !== eventExist.user.toString()) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existente",
            });
        }

        const event = await Event.findByIdAndRemove(id);

        return res.json({ ok: true, event });
    } catch (error) {
        console.warn(error);
        return res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error, en breve lo soluciónaremos",
        });
    }
};

module.exports = {
    create,
    show,
    update,
    destroy,
    paginate,
};
