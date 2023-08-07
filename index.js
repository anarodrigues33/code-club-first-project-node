const express = require("express")
const uuid = require("uuid")


const app = express()
app.use(express.json())

/*
  - Query params => meusite.com/users?name=ana&age=33
  - Route params => /users/2    // Buscar, Deletar ou Atualizar algo Especifico
  - Request Body => {"name":"Rodolfo", "age":}
  */

const users = []

const checkUserId = (request, response, next) => {
  const {id} = request.params
  const index = users.findIndex(user => user.id === id)
 
  if(index < 0){
    return response.status(404).json({ message: "User not found"})
  }

  request.userIndex = index 
  request.userId
  next()
}



app.get("/users", (request, response) => {

  const { name, age } = request.body  

  return response.json(users)
})

app.post("/users", (request, response) => {

  const { name, age } = request.body


  const user = { id: uuid.v4(), name, age }

    users.push(user)

  return response.status(201).json(users)
})

app.put("/users/:id",checkUserId ,(request, response) => {

  const {name, age} = request.body
  const index = request.userIndex
  const id = request.userId

  const updatedUser = {id, name, age }

    

  users[index] = updatedUser

  return response.json(updatedUser)
})

app.delete("/users/:id",checkUserId ,(request, response) => {

  const index = request.userIndex

 

   users.splice(index,1)

  return response.status(204).json(users)
})







app.listen(3000, () => {
  console.log(" 🚀 Server started on port 3000")
})

