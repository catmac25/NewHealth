import React from "react";
import { useState, useContext } from "react";
import {Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import {authContext} from '../context/authContext';
import BASE_URL from "../config";
import HashLoader from "react-spinners/HashLoader";
const Login = ()=>{
    //we first set initial values of form data 
    const [formData, setFormData] = useState({
        phone:"",
        email: '',
        password : ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {dispatch} = useContext(authContext);
    const handleInput = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData,[name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !formData.email || !formData.password || !formData.phone) {
            toast.error("All fields are required.");
            return;
          }
        console.log('Form Data Submitted:', formData);

        try{

            setLoading(true);
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (!res.ok){
                throw new Error(result.message);
            }
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: result.data,
                    token: result.token
                }
            });

            console.log(result, 'login data');
            setLoading(false);
            toast.success(result.message);
            navigate('/');
        }catch(err){
            toast.error(err.message);
             setLoading(false);
        }
      };
    return(
        <>
        <br/>
        <section>
            <div className="flex flex-col justify-center items-center bg-purple-50 h-200">
                <form onSubmit={handleSubmit}className="border border-slate-200 rounded-xl bg-white h-170 w-200 shadow-2xl flex flex-col items-center" > 
                    <br/>
                    <br/>
                    <div className="flex flex-col justify-center items-center">
                        <label name="phone" className="text-xl"> Enter your phone number</label>
                        <input type= "number" value = {formData.phone} className="h-15 w-70 border border-slate-100 rounded-xl bg-purple-50 shadow-2xl text-center" onChange={handleInput} name="phone" required/>
                    </div>
                    <br/>
                    <br/>
                    <div className="flex flex-col justify-center items-center">
                        <label name="email" className="text-xl"> Enter your Email-ID</label>
                        <input type= "text" value ={formData.email} className="h-15 w-100 border border-slate-100 rounded-xl bg-purple-50 shadow-2xl text-center" onChange={handleInput}name="email" required/>
                    </div>
                    <br/>
                    <br/>
                    <div className="flex flex-col justify-center items-center">
                        <label name="password" className="text-xl"> Enter your Password</label>
                        <input type= "password" value = {formData.password} className="h-15 w-80 border border-slate-100 rounded-xl bg-purple-50 shadow-2xl text-center" onChange={handleInput} name="password"required/>
                    </div>

                    <br/>
                    <div className="flex flex-row items-center gap-2">
                    <p>By clicking</p> 
                    <p className="text-red-600 font-bold">  Continue</p>
                    <p>, I agree to </p> <Link to="/tnc" className="text-red-600 font-bold">Terms and Conditions</Link>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <button type = "submit" className="h-10 w-30 rounded-xl shadow-xl bg-violet-500 text-white font-semibold">
                            {loading ? <HashLoader size= {25}/> : 'Login'}
                        </button>
                    </div>
                    <br/>
                    <div className="flex flex-row items-center gap-2">
                    <p>Don't have an account? </p>
                    <Link to = "/signup"className="text-blue-600">Register</Link>
                    </div>
                </form>
            </div>
        </section>
        </>
    )
};

export default Login;