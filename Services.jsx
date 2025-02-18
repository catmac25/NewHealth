import React from "react";
import img1 from '../assets/serviceList/img1.svg'
import img2 from '../assets/serviceList/img2.svg'
import img3 from '../assets/serviceList/img3.svg'
import img4 from '../assets/serviceList/img4.svg'
import img5 from '../assets/serviceList/img5.svg'
import img6 from '../assets/serviceList/img6.svg'
import SearchBar from '../pages/SearchBar'
import ServiceCard from "./ServiceCard";
import { LuAmbulance } from "react-icons/lu";
import {Link} from "react-router-dom"
const ServiceList = [
    {
        image: img1,
        title: "Cardiac Sciences",
    },
    {
        image: img2,
        title: "Gastroenterology and Hepatobiliary Sciences",
    },
    {
        image: img3,
        title: "Haematology"
    },
    {
        image: img4,
        title: "Nephrology",
    },
    {
        image: img5,
        title: "Neurology",
    },
    {
        image: img6,
        title: "Oncology",
    }
]
const Services = () => {
    return (
        <>
            <div className="bg-white">
                <div className="w-full h-10 bg-purple-50 flex flex-row justify-around items-center">
                    {/*------banner----- */}
                    <Link to="/contactus" className="text-black hover:text-blue-700"> Request a Callback</Link>
                    <Link to="/appointment" className="text-black hover:text-blue-700"> Book Appointment</Link>
                    <Link to="/appointment" className="text-black hover:text-blue-700"> Get Health Checkup </Link>
                </div>
                <br />
                <br />
                <div className="flex flex-row justify-center items-center">
                    <SearchBar text="Search for Services"/>
                </div>
                <div>
                    <br />
                    <br />
                    <br />
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-2xl">TOP SERVICES</h1>
                        <br />
                        <div className="flex flex-row justify-around gap-x-7">

                            {ServiceList.map((service, index) => (
                                <ServiceCard key={index} title={service.title} image={service.image}
                                />
                            ))}
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row justify-center items-center gap-x-3">
                        <p className="text-xl text-black hover:text-blue-700"> Need Help?</p>
                        <Link to = "/contactus" className="text-blue-700 text-xl"> Contact Us</Link>
                        </div>
                        <br/>
                    </div>
                </div>
                <br/>
            </div>
        </>
    )
};

export default Services;