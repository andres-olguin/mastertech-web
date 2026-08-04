// SPDX-License-Identifier: MIT
// MasterTech SpA - Módulo de Informática Jurídica v1.0
pragma solidity ^0.8.20;

contract LegalContractRegistry {
    struct ContractRecord {
        string contractHash;
        uint256 timestamp;
        address signingParty;
        bool isValid;
    }

    mapping(bytes32 => ContractRecord) public registry;

    event ContractRegistered(bytes32 indexed docId, address indexed signer);

    function registerDocument(bytes32 docId, string memory docHash) external {
        require(!registry[docId].isValid, "El documento ya fue registrado previamente.");
        registry[docId] = ContractRecord(docHash, block.timestamp, msg.sender, true);
        emit ContractRegistered(docId, msg.sender);
    }
}