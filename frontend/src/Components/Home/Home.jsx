import React, { useEffect, useState } from 'react'
import Create from '../Create/Create'
import "./Home.css"
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs"

function Home() {
  const [todos, setTodos] = useState([]) // State to save todos

  const handleEdit = (id) => {
    axios.put("https://todoapp-backend-hto7.onrender.com/" + id)
      .then(result => {
        location.reload()
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleDelete = (id) => {
    axios.delete("https://todoapp-backend-hto7.onrender.com/" + id)
      .then(result => {
        location.reload()
      })
      .catch(error => {
        console.error(error)
      })
    }

    useEffect(() => {
      axios.get("https://todoapp-backend-hto7.onrender.com/get")
        .then(response => {
          setTodos(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }, [])
    return (
      <div className='container'>
        <h2>Todo List</h2>
        <Create />

        {
          todos.length === 0 ? <h3>No todos yet!</h3> :
            todos.map(todo => (
              <div className='task'>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                  {todo.done ? <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill> : <BsCircleFill className='icon' />}
                  <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <div>
                  <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                </div>
              </div>
            ))
        }



      </div>
    )
  }

  export default Home
