const router = require('express').Router();

router.get('', (req, res) => {
    res.send('Server alive');
})

module.exports = router;