const { Router } = require('express')
const router = Router()

const { getDataBase, getData, createData, deleteData, editData} = require('../controllers/index.controller')

router.get('/', getDataBase)
router.get('/:id', getData)
router.post('/', createData)
router.delete('/:id', deleteData)
router.put('/:id', editData)

module.exports = router