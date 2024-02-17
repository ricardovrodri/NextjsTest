import Link from 'next/link'

function NavBar(){
    return(
        <nav className="bg-gray-950 py-5 mb-2">
            <div className='container flex justify-between px-10 mx-auto md:px-0 '>
                <Link href='/'><h1 className='text-2xl font-bold'> Next Mongo </h1></Link>
                <ul className='flex gap-x-4'>
                    <li>
                        <Link href='/tasks/new'> New Task</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar