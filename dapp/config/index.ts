import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xEb51599AeAD6Dc379AdD59c436c09A24770c1342",
        abi as any,
        signer
    );
}