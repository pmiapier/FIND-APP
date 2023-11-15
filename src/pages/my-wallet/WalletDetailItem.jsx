import { useAuth } from "../../hooks/useAuth";

export default function WalletDetailItem({deposit,amount,owner_status,rentee_status,createdAt,ownerId,renteeId}) {
  const { authUser } = useAuth();
  const rent = "Rent"
  const owner = "Owner"
  return (
    <div>
      <div className="flex justify-between p-2 hover:bg-gray-50">
        <span className="flex flex-1 ">2310285UNAB8UH</span>
        <span className="flex flex-1">{createdAt}</span>
        <span className="flex flex-1 text-green-500">{authUser.id === renteeId ? rentee_status : owner_status}</span>
        <span className="flex flex-1">{authUser.id === renteeId ? deposit : amount}</span>
        <span className="flex flex-1">{authUser.id === renteeId ? rent : owner}</span>
        
      </div>
    </div>
  );
}
