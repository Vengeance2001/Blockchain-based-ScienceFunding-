// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScientificResearchFundraising {
    address public owner;
    uint256 public campaignCount = 0;
    uint256 public minVotesRequired = 50; // Minimum percentage of votes required to release funds

    struct Campaign {
        string title;
        string creatorName;
        uint256 id;
        string description;
        uint256 goalAmount;
        uint256 raisedAmount;
        address payable creator;
        bool isCompleted;
        uint256 totalVotes;
        mapping(address => bool) votes;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public donations;

    event CampaignCreated(uint256 id, string title, string creatorName);
    event DonationMade(uint256 campaignId, address donor, uint256 amount);
    event ApprovalVote(uint256 campaignId, address voter);
    event WithdrawalInitiated(uint256 campaignId, address creator, uint256 amount);
    event WithdrawalApproved(uint256 campaignId, address creator, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // creates the campaign
    function createCampaign(
        string memory title,
        string memory creatorName,
        string memory description,
        uint256 goalAmountInWei
    ) public {
        campaignCount++;
        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.title = title;
        newCampaign.creatorName = creatorName;
        newCampaign.id = campaignCount;
        newCampaign.description = description;
        newCampaign.goalAmount = goalAmountInWei;
        newCampaign.creator = payable(msg.sender);
    }

    // donate to the campaign
    function donate(uint256 campaignId) public payable {
        require(campaignId > 0 && campaignId <= campaignCount, "Invalid campaign ID");
        require(msg.value > 0, "Donation amount must be greater than zero");

        campaigns[campaignId].raisedAmount += msg.value;
        donations[campaignId][msg.sender] += msg.value;

        emit DonationMade(campaignId, msg.sender, msg.value);
    }
    // voting by the donors
    function voteApproval(uint256 campaignId) public {
        require(campaignId > 0 && campaignId <= campaignCount, "Invalid campaign ID");
        require(!campaigns[campaignId].isCompleted, "Campaign is completed");
        require(!campaigns[campaignId].votes[msg.sender], "You have already voted for this campaign");

        campaigns[campaignId].votes[msg.sender] = true;
        campaigns[campaignId].totalVotes++;
        emit ApprovalVote(campaignId, msg.sender);
    }
    // witdraw amount by campaign creator.
    function initiateWithdrawal(uint256 campaignId) public {
        require(campaignId > 0 && campaignId <= campaignCount, "Invalid campaign ID");
        require(msg.sender == campaigns[campaignId].creator, "Only campaign creator can initiate withdrawal");
        require(campaigns[campaignId].totalVotes > 0, "No votes received");
        require(
            (campaigns[campaignId].totalVotes * 100) >=
                (minVotesRequired * campaignCount),
            "Insufficient approval votes"
        );

        uint256 withdrawalAmount = campaigns[campaignId].raisedAmount;
        campaigns[campaignId].raisedAmount = 0;
        campaigns[campaignId].isCompleted = true;
        campaigns[campaignId].creator.transfer(withdrawalAmount);

        emit WithdrawalApproved(campaignId, campaigns[campaignId].creator, withdrawalAmount);
    }
}
