import React from 'react'
import { Form } from 'react-router-dom'

const CreatePost = () => {
  return (
    <form>
        <input type="title" placeholder='Title' />
        <input type="summary" placeholder='Summary' />
        <input type="file" />
        <textarea name="" id="" cols="30" rows="10"></textarea>

    </form>
  )
}

export default CreatePost
