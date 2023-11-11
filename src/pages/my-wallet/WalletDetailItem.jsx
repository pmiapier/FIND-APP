import { useAuth } from "../../hooks/useAuth";

export default function WalletDetailItem({deposit,amount,status,createdAt,ownerId,renteeId}) {
  const { authUser } = useAuth();

  return (
    <div>
      <div className="flex justify-between p-2 hover:bg-gray-50">
        <span className="flex flex-1 ">2310285UNAB8UH</span>
        <span className="flex flex-1">{createdAt}</span>
        <span className="flex flex-1">{status}</span>
        <span className="flex flex-1">{authUser.id === renteeId ? deposit : amount}</span>
        
      </div>
    </div>
  );
}
