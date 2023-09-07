const express = require('express')
const app = express()
const port = 3001
const path = require('path')
const {readFile, writeFile} = require('fs/promises')

const { v4: uuidv4 } = require('uuid');

app.use(express.json())
app.use(express.urlencoded({
   extended:true 
}))
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"/public/index.html"))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"))
  })

  app.get('/api/notes', (req, res) => {
  readFile('db/db.json').then(function(read){
 res.send(read)
  })  
  })

  app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4()
    readFile('db/db.json').then(function(read){
      const dbData = JSON.parse(read)
      dbData.push(newNote)
      return writeFile('db/db.json', JSON.stringify(dbData) )
         }) .then(function(){
            res.json('jobs done')
         }) 
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})