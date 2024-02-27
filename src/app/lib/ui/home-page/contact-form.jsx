'use client'

export default function ContactForm() {
    const inputStyling = "bg-transparent border rounded-lg py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light"
    return (
        <div className='w-full m-auto min-h-min px-2 py-2'>
            <form className="rounded-lg shadow-xl flex flex-col px-4 py-8 mx-auto text-white">
                <h1 className="text-2xl xl:text-4xl font-bold">Questions? Contact Us!</h1>

                <label htmlFor="fullname" className="font-light mt-8">Full name<span className="text-red-500">*</span></label>
                <input type="text" name="fullname" required className={inputStyling} />

                <label htmlFor="email" className="font-light mt-4">E-mail<span className="text-red-500">*</span></label>
                <input type="email" name="email" required className={inputStyling} />

                <label htmlFor="subject" className="font-light mt-4">Subject<span className="text-red-500">*</span></label>
                <input type="text" name="subject" required className={inputStyling} />

                <label htmlFor="message" className="font-light mt-4">Message<span className="text-red-500">*</span></label>
                <textarea name="message" required className={inputStyling}></textarea>
                <div className="flex flex-row items-center justify-start mx-auto">
                    <button className="text-base lg:text-lg px-10 mt-8 py-2 bg-gray-800 hover:bg-gray-600 text-emerald-500 font-bold rounded-md items-center">
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}