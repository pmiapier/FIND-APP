import React from "react";
import WalletBalance from "./WalletBalance";
import WalletDetail from "./WalletDetail";

export default function WalletPage() {
  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="flex justify-center  ">
        <WalletBalance />
      </div>
      <div className="flex justify-center">
        <WalletDetail />
      </div>
    </div>
  );
}
