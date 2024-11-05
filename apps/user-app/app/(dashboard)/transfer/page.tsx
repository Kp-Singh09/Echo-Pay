import { AddMoney } from "../../../components/AddMoneyCard";

export default async function() {
    return <div className="w-full">
        <div className="text-4xl text-gray pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="pt-4 w-full flex justify-center">
            <div>
                <AddMoney />
            </div>
            
        </div>
    </div>
}