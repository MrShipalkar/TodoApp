import React, { useState } from 'react'
import "./Create.css"
import axios from "axios"

function Create() {
  const [ task, setTask]= useState()
  const handleAdd = ()=>{
    axios.post('https://todoapp-backend-hto7.onrender.com/add', {task: task})
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='create-form'>
        <input type="text" placeholder='Enter Task' onChange={(e)=>setTask(e.target.value)}/>
        <button type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create
