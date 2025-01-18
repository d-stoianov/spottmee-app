const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="mx-10 my-[3.5rem] flex flex-col items-center justify-end gap-[3rem] lg:my-[5rem]">
            <div className="flex items-end gap-[1rem]">
                <img
                    className="w-[3rem] lg:w-[3.5rem]"
                    src="/logo.png"
                    alt="logo"
                />
                <h1 className="font-comfortaa text-4xl lg:text-5xl">
                    EventifyAI
                </h1>
            </div>
            {children}
        </main>
    )
}

export default PageLayout
