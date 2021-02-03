/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const sqlite3 = require('sqlite3')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 8118

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})

app.use(bodyParser.json())
app.use(cors())

const db = new sqlite3.Database('./test.db', (err) => {
  err ? console.error('Error while openning database: ' + err.message)
    : db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name NVARCHAR(20)  NOT NULL, description NVARCHAR(30), address NVARCHAR(100))', (err) => {
      if (err) {
        console.log('Table already exists.')
      }
      const insert = 'INSERT INTO users (name, description, address) VALUES (?,?,?)'
      db.run(insert, ['Test1', 'User Test1', 'Address 1'])
      db.run(insert, ['Test2', 'User Test2', 'Address 2'])
      db.run(insert, ['Test3', 'User Test3', 'Address 3'])
    })
})

app.get('/api/users', (req, res) => {
  const sql = 'select * from users'
  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      success: true,
      payload: rows,
      description: 'data from users table'
    })
  })
})

app.patch('/api/update', (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    id: req.body.id
  }
  const sql = 'UPDATE users set name = COALESCE(?,name), description = COALESCE(?,description), address = COALESCE(?,address) WHERE id = ?'
  const params = [data.name, data.description, data.address, data.id]
  db.run(sql, params,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message })
        return
      }
      res.json({
        message: 'success',
        item: data
      })
    })
})

app.post('/api/user', (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    address: req.body.address
  }
  const sql = 'INSERT INTO users (name, description, address) VALUES (?,?,?)'
  const params = [data.name, data.description, data.address]
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    data.id = this.lastID
    res.json({
      message: 'success',
      item: data
    })
  })
})

app.delete('/api/delete', (req, res) => {
  const data = {
    id: req.body.id
  }
  const sql = 'DELETE FROM users WHERE id = ?'
  const params = [data.id]
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: res.message })
      return
    }
    res.json({
      message: 'deleted',
      id: data.id
    })
  })
})
