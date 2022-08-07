import React from 'react'
import cross from './images/icon-cross.png'
import { useGlobalContext } from './context'
import check from './images/icon-check.png'
const List = () => {
    const { list, removeItem, completeTodo, filterList, clearCompleted } = useGlobalContext()
    
    return (
        <div className="list">
            {
                list.map((item)=> {
                    const { id, title,isComplete } = item;
                        return (
                            <div className="single-list" key={id}>
                                <div onClick={()=> completeTodo(id)}>
                                    <span className={ isComplete ? "btn btn-complete" : "btn"} >
                                        {isComplete && <img src={check} alt="complete"/>}
                                    </span>
                                    <p className={`${isComplete && "complete"}`}>{title}</p>
                                </div>
                                <img src={cross} alt="times" onClick={()=>removeItem(id)}/>
                            </div>
                        )    
                })
            }
                
            
            {
                list.length > 0 && 
                <div className="footer">
                <div className="amount">
                    {list.length} items left
                </div>
                <div className="filter-btns">
                    <button onClick={() => filterList("all")}>all</button>
                    <button onClick={()=>filterList("active")}>active</button>
                    <button onClick={() => filterList("completed")}>completed</button>
                </div>
                <button className="clear" onClick={clearCompleted}>
                    clear completed
                </button>
            </div>
            }
            
        </div>
    )
}

export default List