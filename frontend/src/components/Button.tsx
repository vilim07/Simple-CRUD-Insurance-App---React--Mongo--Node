const Button = ({click=null, children, css=""}: {click?: (() =>void) | null, children: string, css?:string}) =>{
    return (
        <button data-testid="button" onClick={click ? ()=>{click()} : undefined} className={"px-4 py-1 border-solid border-4 border-purple-600 rounded-full hover:text-white hover:bg-purple-600 transition-all " + css}>{children}</button>
    )
}

export default Button