import AuthButton from './AuthButton';

const Navbar = () => {
    return (
        <nav className='absolute w-full p-4 flex justify-between items-center bg-[#063a4f]'>
            <a href="/">
            </a>

            <AuthButton />
        </nav>
    );
};

export default Navbar;