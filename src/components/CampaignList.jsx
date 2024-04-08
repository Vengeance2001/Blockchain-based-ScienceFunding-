import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CampCard from "./CampCard";

const CampaignList = ({ state }) => {
  const { contract } = state;
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const template = async () => {
      const campaignCount = await contract.campaignCount();
      const campaignsArray = [];

      for (let i = 1; i <= campaignCount.toNumber(); i++) {
        const camp = await contract.campaigns(i);
        campaignsArray.push(camp);
      }

      // Set the campaigns in state
      setCampaigns(campaignsArray);
    };

    contract && template();
  }, [contract]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 h-full w-full bg-gray-200">
      {campaigns.map((campaign, index) => (
        <CampCard key={index} campaign={campaign} contract={contract} />
      ))}
    </div>
  );
};

export default CampaignList;
