import React from 'react'
import { useGlobalContext } from './context'
const Form = () => {
    const {name, handleSubmit, setName} = useGlobalContext()
    return (
        <form onSubmit={handleSubmit}>
                <span className="btn" onClick={handleSubmit}>

                </span>
                <input type="text" placeholder='create a new todo' value={name} onChange={(e)=>setName(e.target.value)}/>
            </form>
    )
}

export default Form