import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const EditPost = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)
    
useEffect(()=>{
    fetch('http://localhost:4000/post/' + id).then(response => {
        response.json().then(postInfo =>{
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
        })
    })
},[])


 
    const updatePost =async (e)=> {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if(files?.[0]){
        data.set('file', files?.[0])
    }
 
       await fetch('http://localhost:4000/post',{
            method: 'POST',
            body: data,
        })
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to={'/post/'+id} />
    }
    return (
        <form onSubmit={updatePost}>
            <input type="title" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
            <input type="summary" placeholder='Summary' value={summary} onChange={e => setSummary(e.target.value)} />
            <input type="file" onChange={(e => setFiles(e.target.files))} />
            <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} />
            <button style={{ marginTop: '5px' }}>Update Blog</button>
        </form>
    )
}

export default EditPost
