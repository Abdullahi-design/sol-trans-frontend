import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
    return (
        <nav className='absolute w-full p-4 flex justify-between items-center bg-[#063a4f]'>
            <a href="/">
            </a>

            <WalletMultiButton style={{ backgroundColor: "#ea580c" }} className='!bg-orange-600 hover:!bg-black transition-all duration-200 !rounded-lg' />
        </nav>
    );
};

export default Navbar;