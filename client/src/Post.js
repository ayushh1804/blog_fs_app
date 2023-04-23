export default function Post({title,summary,cover,content,createdAt}) {
    return(
        <div className="posts">
        <div className="image"><img src="https://images.pexels.com/photos/16066100/pexels-photo-16066100.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" /></div>

        <div className="texts">
          <h2>{title}</h2>
          <p className="info">
            <a href="" className="author">author</a>
            <time>{createdAt}</time>
          </p>
          <p className='summary'>{summary}</p>
        </div>

      </div>
    )
}