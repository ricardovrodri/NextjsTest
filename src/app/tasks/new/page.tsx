"use client"
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

function Form(){
    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    });

    const router = useRouter()
    const params = useParams()

    const handleSubmit = async (e: FormEvent ) => {
        e.preventDefault()
        if(!params.id){
            const res = await fetch('/api/tasks', {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: {
                    "Content-Type":"application/json"
                }
            })
        } else {
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: "PUT",
                body: JSON.stringify(newTask) , 
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            console.log(data)
        }
        

        router.push('/')
        router.refresh()
    }

    const handleDelete = async (e: FormEvent ) => {
        const res = await fetch(`/api/tasks/${params.id}`, {
            method: "DELETE", 
        });
        router.push('/')
        router.refresh()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask({... newTask, [e.target.name]: e.target.value})
    }

    const getTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`);
        const data = await res.json();
        setNewTask({
            title: data.title,
            description : data.description
        })
    }

    useEffect( () => {
        if (params.id) {
            getTask()
        }
    }, [])
    return(
        <div className="h-[calc(100vh)-7rem] flex justify-center items-center">
            <form onSubmit={handleSubmit}> 
                <header className='flex justify-between'>
                    <h1 className='font-bold text-3xl'>
                        {
                            !params.id ? "Create a new task" : "Update task"
                        }
                    </h1>
                    {params.id ? <button 
                        type="button"
                        onClick={handleDelete}
                        className='bg-red-500 px-3 py-1 rounded-md'>
                        Delete
                    </button> : null}
                    
                </header>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    className="bg-gray-800 border-2 w-full p-4 rounded.lg my-4"
                    onChange={handleChange}
                    value={newTask.title}/> 
                <textarea 
                    name="description"
                    placeholder="Description"
                    rows = {3}
                    className="bg-gray-800 border-2 w-full p-4 rounded.lg my-4"
                    onChange={handleChange}
                    value={newTask.description}/>
                <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2">
                    {
                        !params.id ? "Create" : "Update"
                    }
                </button>
            </form>
        </div>
    )
}

export default Form