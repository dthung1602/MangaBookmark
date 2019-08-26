const express = require('express');
const router = express.Router();
const {handlerWrapper} = require('./utils');
const {check} = require('express-validator');


const {Subscription, User, connectToDB} = require('../models');



router.get('/',
    handlerWrapper(async (req, res) => {
        return res.json(await Subscription.find({user: req.user.id}));
    })
);

router.post('/subscribe',
    check('os').exists().isIn(['Windows', 'MacOS', 'Linux', 'Android', 'iOS', 'Unknown']),
    check('browser').exists().isIn(['Opera', 'Internet Explorer', 'Chrome', 'Safari', 'Firefox', 'Unknown']),
    check('endpoint').exists().isURL()
        .custom(async (endpoint, {req}) => {
            connectToDB();
            const count  = await Subscription.count({endpoint: endpoint});
            if (count > 0)
                throw new Error('Subscription has already been added')
        }),
    check('auth').exists(),
    check('p256dh').exists(),

    handlerWrapper(async (req, res) => {
        const subscription = new Subscription(req.body);
        subscription.user = req.user.id;
        await subscription.save();
        res.json({});

        // webpush.sendNotification(subscription.toStdFormat(),JSON.stringify({
        //     'title': 'This is a title',
        //     'body': 'a b c d e f g h i j k l m  n ',
        //     'icon': 'https://spendtrackapp.herokuapp.com/static/spendtrackapp/img/iconmonstr-facebook-4-48.8ea6c9dea35d.png'
        // })).then(console.log).catch((err) => {
        //     console.error(err)
        // });
    })
);


router.post('/unsubscribe',
    check('subscription').exists()
        .custom(async (pushServiceId, {req}) => {
            connectToDB();
            const ps = await Subscription.findById(pushServiceId);
            if (ps === null || ps.user.toString() !== req.user.id)
                throw new Error('Cannot find push service');
            req.pushService = ps;
        }),

    handlerWrapper(async (req, res) => {
        await req.pushService.delete();
        res.json({})
    })
);


module.exports = router;

