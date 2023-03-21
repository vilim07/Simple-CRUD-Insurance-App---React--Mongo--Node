import { ReactNode, useEffect } from "react"

const Modal = ({ handler, children }: { handler:React.Dispatch<React.SetStateAction<boolean>>, children: ReactNode }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'visible' }
    }, [])


    return (
        <div data-testid="modal" className="fixed w-full h-full top-0 left-0 z-10">


            <div className="absolute z-0 opacity-20 w-full h-full bg-gray-800"></div>
            <div className="m-auto translate-y-1/2 px-10 py-8 bg-white border-2 border-black rounded-lg shadow-xl w-1/3">
                <button onClick={() => { handler(false) }} className="absolute right-4 top-1 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal