import { Card3 } from "@repo/ui/card3";

export const BalanceCard = ({amount, id,p_number}: {
    amount: number;
    id: number;
    p_number:string
}) => {
    return <Card3 title={"Details"}>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
               Your Id
            </div>
            <div>
              {id}
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Your Phone No.
            </div>
            <div>
               {p_number}
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
            Available Balance
            </div>
            <div>
            {amount / 100} INR
            </div>
        </div>
    </Card3>
}