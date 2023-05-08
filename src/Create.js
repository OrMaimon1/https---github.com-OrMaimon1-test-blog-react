import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [auther, setAuther] = useState('mario');
    const [isPending, setPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const blog = { title, body, auther };
        setPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setPending(false);
            history('/');
        })

    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label> Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label> Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                />
                <label>Blog auther:</label>
                <select
                    value={auther}
                    onChange={(event) => setAuther(event.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button>Adding Blog....</button>}
            </form>
        </div>
    );
}

export default Create;