import React, { useContext,useState,useEffect } from 'react'

const AppContext = React.createContext()
const getLocalStorage = ()=> {
    let list = localStorage.getItem('list')
    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}
const getStorageTheme = () => {
    let theme = '';
    if (localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme');
    }
    return theme;
};
export const AppProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [list, setList] = useState(getLocalStorage());
    const [theme, setTheme] = useState(getStorageTheme());

    // add item
    const handleSubmit = (e) => {

        e.preventDefault()

        if (!name || /^\s*$/.test(name)) {
            return null;
        } else {
            const newItem = { id: new Date().getTime().toString(), title: name,isComplete:false,active:true}
            setList([...list, newItem])
            setName("")
        }
    }

    // remove item
    const removeItem = (id) => {
        let newList = list.filter((item) => item.id !== id)
        setList(newList)
    }
    //

    const completeTodo = (id) => {
        let updated = list.map((item) => {
            if (item.id === id) {
                item.isComplete = !item.isComplete
                item.active = !item.active
            }
            return item;
        })
        setList(updated)
    }
    
    // filter todos 
    const filterList = (text) => {
        if (text === "active") {
            let activeTodos = list.filter((item) => item.active === true && item.isComplete === false)
            setList(activeTodos)
        }
        else if (text === "completed") {
            let completedTodos = list.filter((item) => {
                if (item.isComplete === false) {
                    return item
                }
                else {
                    return item.isComplete === true && item.active === true
                }
            })
            setList(completedTodos)
        } 
    }

    // clear completed
    const clearCompleted = () => {
        let activeTodos = list.filter((item) => item.isComplete === false)
        setList(activeTodos)
    }

    useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
    }, [list])


    // theme switcher
    const switchTheme = () => {
    if (theme === '') {
        setTheme('dark');
    } else {
        setTheme('');
    }
    };
    useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <AppContext.Provider value={{
            setName,
            name,
            handleSubmit,
            list,
            removeItem,
            completeTodo,
            filterList,
            clearCompleted,
            switchTheme,
            theme
            
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}