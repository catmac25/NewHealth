import React from "react";
import {useState} from "react"


const SearchBar = ({text})=>{
    const [search, setSearch] = useState('');

    const handleChange = (event)=>{
        setSearch(event.target.value);
    }

    return (
        <div>
            <input type = "text" placeholder={text}
            value = {search} onChange={handleChange} 
            className="h-20 w-140 rounded-xl shadow-xl pl-10 text-center"/>
        </div>
    )
}

export default SearchBar;