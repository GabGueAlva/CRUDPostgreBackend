const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Antonela1',
    database: 'PruebaTecnica',
    port: '5432'
})

const getDataBase = async (req,res) =>{
    const response = await pool.query('SELECT * FROM alumno')
    res.json(response.rows)
}

const getData = async (req, res) => {

    const { id } = req.params

    try {
        const result = await pool.query('SELECT * FROM alumno WHERE id = $1', [id])

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Alumno no encontrado"
            })
        }

        return res.json(result.rows[0])
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const createData = async (req, res) => {
    const { nombre, apellido, email, curso_id } = req.body
    try {
        const result = await pool.query(
            "INSERT INTO alumno (nombre, apellido, email, curso_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre, apellido, email, curso_id]
        )
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteData = async (req, res) => {

    const { id } = req.params

    try {
        const result = await pool.query('DELETE FROM alumno WHERE id = $1 RETURNING *', [id])

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Alumno no encontrado"
            })
        }

        return res.status(200).json({ message: 'Alumno eliminado exitosamente' });
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const editData = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, apellido, email, curso_id } = req.body

        const result = await pool.query('UPDATE alumno SET nombre = $2, apellido = $3, email = $4, curso_id = $5 WHERE id = $1 RETURNING *',
            [id, nombre, apellido, email, curso_id]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Alumno no encontrado"
            })
        }

        return res.json(result)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDataBase,
    getData,
    createData,
    deleteData,
    editData
}