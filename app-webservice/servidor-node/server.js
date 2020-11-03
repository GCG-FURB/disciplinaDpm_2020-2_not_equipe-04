const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 3000

let lista = []

app.get('/listar', (req, res) => {
	console.log('Consumiu listar');
	res.send(JSON.stringify(lista))
})

app.post('/criar', (req, res) => {
	console.log('Consumiu criar');
	lista.push(req.body)
	res.send(true);
})

app.listen(port, () => { })