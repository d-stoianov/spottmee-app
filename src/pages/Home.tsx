const Home = () => {
    return (
        <main className="mt-[10%] flex flex-col items-center justify-end gap-[3rem]">
            <div className="flex items-end gap-[1rem]">
                <img className="w-[3.5rem]" src="logo.png" alt="logo" />
                <h1 className="font-comfortaa text-5xl">EventifyAI</h1>
            </div>
            <button className="flex h-[12rem] w-[32rem] flex-col items-center justify-center gap-[0.75rem] border-2 border-black bg-white">
                <img
                    className="mt-[1rem] w-[4rem]"
                    src="upload.png"
                    alt="upload"
                />
                <span className="font-comfortaa text-sm text-black">
                    Drop files here or click to upload
                </span>
            </button>
        </main>
    )
}

export default Home
