// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Maes is ERC20, Ownable {

    mapping(address => uint256) private _stakes;
    mapping(address => uint256) private _lastStakeTimestamp;
    uint256 private _rewardRate = 1;
    uint256 private lockInPeriod = 60; 

    constructor(address initialOwner) 
        ERC20("Maes", "MAES") 
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public {
        uint256 adjustedAmount = amount * 1e18;
        _mint(to, adjustedAmount);
    }

    function withdraw() public {
        require(block.timestamp > (_lastStakeTimestamp[msg.sender] + lockInPeriod), "Coin in Lock in period");
        require(_stakes[msg.sender] > 0, "No staked coins");
        uint256 stakedAmount = _stakes[msg.sender];
        uint256 reward = ((block.timestamp - _lastStakeTimestamp[msg.sender]) * _rewardRate) * 1e18;
        _stakes[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);

  }
        function stake(uint256 amount) public {
        uint256 adjustedAmount = amount * 1e18;
        require(adjustedAmount > 0, "Invalid amount");
        require(balanceOf(msg.sender) >= adjustedAmount, "Insufficient balance");
        _stakes[msg.sender] += adjustedAmount;
        _lastStakeTimestamp[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), adjustedAmount);
  }
    
}