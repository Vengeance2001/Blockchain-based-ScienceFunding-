import React, { useState } from "react";
import { ethers } from "ethers";

const CampCard = ({ campaign, contract }) => {
  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonate = async () => {
    if (donationAmount > 0) {
      try {
        // Call the donate function on the contract to make a donation
        await contract.donate(campaign.id, {
          value: ethers.utils.parseEther(donationAmount.toString()),
        });
        // Reset the donation amount input
        setDonationAmount(0);
      } catch (error) {
        console.error("Error donating to the campaign:", error);
      }
    }
  };

  const handleVoteApproval = async () => {
    try {
      // Call the voteApproval function on the contract to cast a vote
      await contract.voteApproval(campaign.id);
      console.log("worked")
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  const handleInitiateWithdrawal = async () => {
    try {
      // Call the initiateWithdrawal function on the contract to initiate a withdrawal
      await contract.initiateWithdrawal(campaign.id);
    } catch (error) {
      console.error("Error initiating withdrawal:", error);
    }
  };

  return (
    <div className="bg-gray-300 text-gray-800 border border-gray-400 shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-bold mb-2 text-center">{campaign.title}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Scientist Name:</strong>
          </p>
          <p>{campaign.creatorName}</p>
          <p>
            <strong>Goal Amount:</strong>
          </p>
          <p>{(campaign.goalAmount.toString() / 1000000000000000000)} ETH</p>
          <p>
            <strong>Total Votes:</strong>
          </p>
          <p>{campaign.totalVotes.toString()}</p>
        </div>
        <div>
          <p>
            <strong>Description:</strong>
          </p>
          <p>{campaign.description}</p>
          <p>
            <strong>Raised Amount:</strong>
          </p>
          <p>{(campaign.raisedAmount.toString()) / 1000000000000000000} ETH</p>
          <p>
            <strong>Is Completed:</strong>
          </p>
          <p>{campaign.isCompleted ? "Yes" : "No"}</p>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <input
          type="number"
          className="rounded-l-lg border border-gray-300 p-2 w-16" // Adjust the width here
          placeholder="Amount (ETH)"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded-r-l-lg p-2 hover:bg-blue-700"
          onClick={handleDonate}
        >
          Donate
        </button>
        {campaign.isCompleted === false && (
          <>
            <button
              className="bg-green-500 text-white rounded-r-r-l-lg p-2 hover:bg-green-700 ml-2"
              onClick={handleVoteApproval}
            >
              Vote Approval
            </button>
            {campaign.creator === contract.signerAddress && (
              <button
                className="bg-red-500 text-white rounded-r-lg p-2 hover-bg-red-700 ml-2"
                onClick={handleInitiateWithdrawal}
              >
                Initiate Withdrawal
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CampCard;
