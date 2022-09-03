// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "forge-std/Test.sol";
import "../PlasticETH.sol";

contract PlasticETHTest is Test {
    event Buy(address indexed buyer, uint256 amount, uint256 nonce);

    PlasticETH plasticETH;

    function setUp() external {
        plasticETH = new PlasticETH();
        vm.deal(address(this), 10 ether);
    }

    function testBuyEmitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit Buy(address(this), 1 ether, 0);
        plasticETH.buy{value: 1 ether}();
    }

    function testWithdraw() public {
        plasticETH.buy{value: 1 ether}();
        plasticETH.buy{value: 1 ether}();
        plasticETH.withdraw();
        assertEq(address(this).balance, 10 ether);
    }

    function testWithdrawFailIfNotOwner() public {
        plasticETH.buy{value: 1 ether}();
        vm.prank(address(0xBEEF));
        vm.expectRevert("UNAUTHORIZED");
        plasticETH.withdraw();
    }

    receive() external payable {}
}