// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainSmartContract {
    // Global variables
    mapping(string => string) public productIDIpfsHash;
    mapping(string => string) public productIDImageHash;

    // Dashboard arrays
    string[][] public manufacturerDashboard;
    string[][] public distributorDashboard;
    string[][] public logisticsDashboard;

    // Mappings for user ID to dashboard type
    mapping(string => string[][]) public manufacturerUserDashboard;
    mapping(string => string[][]) public distributorUserDashboard;
    mapping(string => string[][]) public logisticsUserDashboard;

    // Events for dashboard updates
    event ManufacturerDashboardUpdated(string[] manufacturerRow);
    event DistributorDashboardUpdated(string[] distributorRow);
    event LogisticsDashboardUpdated(string[] logisticsRow);

    // Function to add product information and update dashboards
    function addProductDetails(
        string memory productID,
        string memory ipfsHash,
        string memory imageHash
    ) external {
        // Add product information
        productIDIpfsHash[productID] = ipfsHash;
        productIDImageHash[productID] = imageHash;

        // Update manufacturer dashboard

        // Distributor and Logistics dashboards can be similarly updated
    }

    // Function to add a row to the Manufacturer Dashboard
    function addManufacturerDashboard(string[] memory manufacturerRow, string memory userID) internal {
        manufacturerDashboard.push(manufacturerRow);
        emit ManufacturerDashboardUpdated(manufacturerRow);

        // Add row to Manufacturer User Dashboard
        manufacturerUserDashboard[userID].push(manufacturerRow);
    }

    // Function to add a row to the Distributor Dashboard
    function addDistributorDashboard(string[] memory distributorRow, string memory userID) external {
        distributorDashboard.push(distributorRow);
        emit DistributorDashboardUpdated(distributorRow);

        // Add row to Distributor User Dashboard
        distributorUserDashboard[userID].push(distributorRow);
    }

    // Function to add a row to the Logistics Dashboard
    function addLogisticsDashboard(string[] memory logisticsRow, string memory userID) external {
        logisticsDashboard.push(logisticsRow);
        emit LogisticsDashboardUpdated(logisticsRow);

        // Add row to Logistics User Dashboard
        logisticsUserDashboard[userID].push(logisticsRow);
    }

    // Get functions for user dashboards
    function getManufacturerUserDashboard(string memory userID) external view returns (string[][] memory) {
        return manufacturerUserDashboard[userID];
    }

    function getDistributorUserDashboard(string memory userID) external view returns (string[][] memory) {
        return distributorUserDashboard[userID];
    }

    function getLogisticsUserDashboard(string memory userID) external view returns (string[][] memory) {
        return logisticsUserDashboard[userID];
    }
}
