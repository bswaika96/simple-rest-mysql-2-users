const db = require('../util/db')

const index = (req, res) => {
    db.execute('SELECT * FROM users').then((data) => {
        return data[0]
    }).then((users) => {
        res.send(users)
    }).catch((err) => {
        console.log(err)
    })
}

const show = (req, res) => {
    db.execute(`SELECT * FROM users WHERE id = ? `, [req.params.id]).then(([data]) => {
        return data[0]
    }).then((user) => {
        res.send(user)
    }).catch((err) => {
        console.log(err)
    })
}

const add = (req, res) => {
    const {name, email, password} = req.body
    const contact = req.body.contact || null
    const dob = req.body.dob || null
    db.execute(`INSERT INTO users (name, email, password, contact, dob) VALUES (?, ?, ?, ?, ?)`, [name, email, password, contact, dob]).then((data) => {
        res.send({
            id: data[0].insertId
        })
    }).catch((err) => {
        console.log(err)
    })
}

const edit = (req, res) => {
    //const id = req.params.id
    db.execute(`SELECT * FROM users WHERE id = ? `, [req.params.id]).then(([data]) => {
        const name = req.body.name || data[0].name
        const email = req.body.email || data[0].email
        const password = req.body.password || data[0].password
        const contact = (req.body.contact || data[0].contact) || null
        const dob = (req.body.dob || data[0].dob) || null
        return {
            name, 
            email, 
            password, 
            contact, 
            dob
        }
    }).then((updatedUser) => {
        return db.execute('UPDATE users SET name = ?, email = ?, password = ?, contact = ?, dob = ? WHERE id = ?', [updatedUser.name, updatedUser.email, updatedUser.password, updatedUser.contact, updatedUser.dob, req.params.id])
    }).then(([data]) => {
        res.send({
            status:'success'
        })
    }).catch((err) => {
        console.log(err)
    })    
}

const remove = (req, res) => {
    db.execute(`SELECT * FROM users WHERE id = ? `, [req.params.id]).then(([data]) => {
        return data[0]
    }).then((user) => {
        return {
            user: user,
            sql: db.execute('DELETE FROM users WHERE id = ?', [req.params.id])
        }
    }).then((data) => {
        res.send(data.user)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    index,
    show,
    add,
    edit,
    remove
}