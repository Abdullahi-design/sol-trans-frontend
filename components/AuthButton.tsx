import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

const AuthButton = () => {

    return (
        <div>
            <WalletMultiButton style={{ backgroundColor: "#ea580c" }} />

            {/* <WalletDisconnectButton /> */}
        </div>
    )
}

export default AuthButton