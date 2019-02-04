const express = require('express')

const controllers = require('../controllers')

const router = express.Router()

router.get('/', controllers.users.index)
router.get('/:id', controllers.users.show)
router.post('/', controllers.users.add)
router.put('/:id', controllers.users.edit)
router.delete('/:id', controllers.users.remove)

module.exports = router