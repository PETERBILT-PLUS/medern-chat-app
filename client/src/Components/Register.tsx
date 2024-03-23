import axios, { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../Context/AuthContext.tsx";

function Register() {
    const { authUser, setAuthUser } = useAuthContext();
    interface IForm {
        username: string,
        email: string,
        password: string,
    }
    const [form, setForm] = React.useState<IForm>({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev, [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res: AxiosResponse = await axios.post("http://localhost:3001/auth/register", form, { withCredentials: true });
            if (res.data.success) {
                toast.success("Successfully");
                console.log(res.data);
                localStorage.setItem("chat-user", JSON.stringify(res.data.user));
                setAuthUser(res.data.user);
            } else if (res.status === 500) {
                toast.error("Internal Server Error");
            } else {
                toast.error("error hapend");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section style={{ minHeight: "100vh" }}>
            <div className="container mx-auto px-5 flex flex-row justify-center items-center py-20">
                <div className="h-full w-full bg-white-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100 px-6 py-10" style={{ minWidth: "300px", maxWidth: "500px", borderRadius: "15px" }}>
                    <form onSubmit={(e) => onSubmit(e)} className="flex flex-col items-end">
                        <input onChange={(e) => handleChange(e)} className="block w-full mb-5 px-2 py-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" placeholder="Username" name="username" />
                        <input onChange={(e) => handleChange(e)} className="block w-full mb-5 px-2 py-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="email" placeholder="E-mail" name="email" />
                        <input onChange={(e) => handleChange(e)} className="block w-full mb-5 px-2 py-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="password" placeholder="Password" name="password" />
                        <button className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 mt-10 px-4 rounded-md shadow-md transition duration-300 ease-in-out">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register