import { Button } from "./button";

interface AppbarProps {
    onSignout: () => void; 
}

export const Appbar = ({ onSignout }: AppbarProps) => {
    return (
        <div className="flex bg-slate-100 justify-between border-b-2 px-4 border-gray-300">
            <div className="flex items-center mx-3 my-3 text-4xl font-bold">
                <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/wallet.png" alt="wallet" className="mr-2" />
                XenoPay
            </div>
            <div className="flex items-center pt-2">
                <Button onClick={onSignout}>Logout</Button>
            </div>
        </div>
    );
}
