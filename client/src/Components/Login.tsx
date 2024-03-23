

function Login() {
    return (
        <section className="py-10 min-h-screen">
            <div className="container mx-auto px-5 flex flex-row justify-center items-center py-10">
                <div className="h-full w-full bg-white-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100 px-6 py-10" style={{ minWidth: "300px", maxWidth: "500px", borderRadius: "15px" }}>
                    <form className="flex flex-col items-end">
                        <input className="block w-full mb-5 px-2 py-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="email" placeholder="E-mail" />
                        <input className="block w-full mb-5 px-2 py-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="password" placeholder="Password" />
                        <button className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 mt-10 px-4 rounded-md shadow-md transition duration-300 ease-in-out">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;