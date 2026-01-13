import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context_API } from "../../../App";
import Introduction_Image from "/Introduction-Image.jpg";

function Introduction() {

    const { light_mode } = useContext(Context_API);

    return (

        <div className={`introduction-box h-auto w-full m-auto ${light_mode ? "bg-red-100" : "bg-red-300"} flex items-center justify-center p-10`}>

            <div className="left h-[30rem] w-1/2 pt-20 text-black flex flex-col items-center justify-start gap-20">

                <h1 className="text-5xl">New Collections For Everyone</h1>

                <Link to={"/new-collections"}>

                    <button className="rounded-lg p-3 bg-blue-700 text-white">View Collections</button>

                </Link>

            </div>

            <div className="right h-[30rem] w-1/2 flex flex-col items-center justify-center">

                <img className="rounded-lg h-full" src={Introduction_Image} alt="Image Not Available" />

            </div>

        </div>

    );

};

export default Introduction;