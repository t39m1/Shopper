import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context_API } from "../App";

function Login() {

    const { light_mode, set_is_logged_in, set_logged_in_user, shopper_users, set_shopper_users } = useContext(Context_API);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    function form_submit(data) {
        let users = shopper_users.length ? shopper_users : JSON.parse(localStorage.getItem("shopper-users")) || [];
        let existing_user = users.find((users_data) => {
            return users_data.e_mail == data.e_mail && users_data.password == data.password;
        });
        if (existing_user) {
            set_logged_in_user(existing_user);
            set_is_logged_in(true);
            set_shopper_users(users);
            localStorage.setItem("shopper-login-status", "true");
            localStorage.setItem("shopper-logged-in-user", JSON.stringify(existing_user));
            localStorage.setItem("shopper-users", JSON.stringify(users));
            navigate("/");
        }
        else {
            alert("Invalid Credentials!");
        }
        reset();
    };

    return (

        <div className={`min-h-[30rem] w-full ${light_mode ? "bg-red-100" : "bg-red-300"} p-14`}>

            <h1 className="text-center text-3xl mb-7">Login Page</h1>

            <form className="login-form rounded-lg h-auto w-1/2 m-auto p-7 bg-blue-700 flex flex-col items-center justify-center gap-5" onSubmit={handleSubmit(form_submit)}>

                <div className="h-auto w-full">

                    <input className={`rounded-lg outline-none h-auto w-full p-2 ${light_mode ? "text-black" : "text-black"}`} type="text" placeholder="Enter Your E-Mail" {...register("e_mail", { required: "E-Mail Is Required!", pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid E-Mail!" } })} />
                    {errors.e_mail && (<p className="font-bold text-red-500">{errors["e_mail"].message}</p>)}

                </div>

                <div className="h-auto w-full">

                    <input className={`rounded-lg outline-none h-auto w-full p-2 ${light_mode ? "text-black" : "text-black"}`} type="password" placeholder="Enter Your Password" {...register("password", { required: "Password Is Required!" })} />
                    {errors.password && (<p className="font-bold text-red-500">{errors["password"].message}</p>)}

                </div>

                <input className="rounded-lg h-auto w-full p-2 bg-red-500 hover:bg-red-600 cursor-pointer" type="submit" value="Login" />

                <p>Don't Have An Account? <Link to={"/register"} className="hover:underline">Register Now!</Link></p>

            </form>

        </div >

    );

};

export default Login;