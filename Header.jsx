import React from "react"
import { useEffect, useRef , useContext} from "react";
import { BiMenu } from "react-icons/bi";
import { FaHandHoldingMedical } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { authContext } from "../../context/authContext";
const navLinks = [
    {
        path: '/',
        display: 'Home'
    },
    {
        path: '/services',
        display: 'Services'
    },
    {
        path: '/contactus',
        display: 'Contact'
    }
];

const Header = () => {

    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const {user, token} = useContext(authContext);
    const handleStickyHeader = ()=>{
        window.addEventListener('scroll', ()=>{
            if (document.body.scrollTop >80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add('sticky_header')
            }else{
                headerRef.current.classList.remove('sticky_header');
            }
        })
    }

    useEffect(()=>{
        handleStickyHeader();
        return ()=> window.removeEventListener('scroll', handleStickyHeader);
    })

    const toggleMenu = ()=>{
        menuRef.current.classList.toggle('show_menu');
    }
    return (
        <header className="header flex justify-around items-center mt-4 bg-gradient-to-r from-blue-100 to-lime-200" ref = {headerRef}>
            <div className="container my-3">
                <div className="flex items-center justify-around p-4 h-[70px]">
                    <div>
                        <FaHandHoldingMedical className="w-12 h-12 font-bold"/>
                    </div>
                    <div className="navigation ml-3 j" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex items-center gap-[2.7rem]">
                            {
                                navLinks.map((link,index) => <li key = {index}>
                                    <NavLink to= {link.path} className={navClass => navClass.isActive?'text-blue-800 text-[16px] leading -7 font-[600]' :
                                        'text-slate-600 text-[16px] leading-7 font-[500]'} 
                                    > {link.display} </NavLink>
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className="flex items-center gap-6 justify-around">
                        <div className="flex items-center gap-4">
                            <h1>{user?.name}</h1>
                            <Link to='/login'>
                            <button className="bg-blue-700 p-4 text-white font-[600] h-[34px] w-[80px] mt-5 flex items-center rounded-xl justify-center transition duration-300 hover:shadow-lg hover:shadow-blue-500"> Login </button>
                            </Link>
                            <span className ="flex flex-row items-center gap-x-4">
                                <BiMenu className="w-6 h-6 cursor-pointer" onClick={toggleMenu}/>
                                <MdNotificationsActive className="w-6 h-6"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
};

export default Header;