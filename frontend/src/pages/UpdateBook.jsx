// this is my frontend\src\pages\UpdateBook.jsx file
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });
    const [loading, setLoading] = useState(false);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const validateInputs = () => {
        const { url, title, author, price, desc, language } = data;
        if (!url || !title || !author || !price || !desc || !language) {
            toast.error("All fields are required");
            return false;
        }
        if (price <= 0) {
            toast.error("Price must be greater than zero");
            return false;
        }
        return true;
    };

    const submit = async () => {
        if (!validateInputs()) return;

        setLoading(true);
        try {
            const response = await axios.put(
                "https://bookwishofficial.onrender.com/api/v1/update-book",
                data,
                { headers }
            );
            toast.success(response.data.message);
            navigate(`/view-book-details/${id}`);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `https://bookwishofficial.onrender.com/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data);
        };
        fetch();
    }, [id]);

    return (
        <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                Update Book
            </h1>
            <div className='p-4 bg-zinc-800 rounded'>
                <fieldset>
                    <div>
                        <label htmlFor='url' className='text-zinc-400'>Image</label>
                        <input
                            type='text'
                            id='url'
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='url of Image'
                            name='url'
                            value={data.url}
                            onChange={change}
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='title' className='text-zinc-400'>Title of Book</label>
                        <input
                            type='text'
                            id='title'
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Title of Book'
                            name='title'
                            value={data.title}
                            onChange={change}
                        />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='author' className='text-zinc-400'>Author of the Book</label>
                        <input
                            type='text'
                            id='author'
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Author of Book'
                            name='author'
                            value={data.author}
                            onChange={change}
                        />
                    </div>
                    <div className='mt-4 flex gap-4'>
                        <div className='w-3/6'>
                            <label htmlFor='language' className='text-zinc-400'>Language</label>
                            <input
                                type='text'
                                id='language'
                                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                                placeholder='Language'
                                name='language'
                                value={data.language}
                                onChange={change}
                            />
                        </div>
                        <div className='w-3/6'>
                            <label htmlFor='price' className='text-zinc-400'>Price</label>
                            <input
                                type='number'
                                id='price'
                                className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                                placeholder='Price'
                                name='price'
                                value={data.price}
                                onChange={change}
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='desc' className='text-zinc-400'>Description</label>
                        <textarea
                            id='desc'
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                            placeholder='Description'
                            name='desc'
                            value={data.desc}
                            onChange={change}
                        />
                    </div>
                    <div className='mt-4 flex items-center justify-center gap-4'>
                        <button
                            className={`relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-blue-500 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={submit}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Update"}
                        </button>
                    </div>
                </fieldset>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UpdateBook;

