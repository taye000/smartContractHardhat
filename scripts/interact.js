const URL_KEY = process.env.URL_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/Greeter.sol/Greeter.json");
//console.log(contract);

//provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(URL_KEY);

//signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

//contract
const greeterContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

// console.log(contract, alchemyProvider, signer, greeterContract);

async function main(){
    try{
    const message = await greeterContract.message();
    console.log("The message is: ", message);    
    }catch(error){
        console.log("error doing this sht", error);
    }

    console.log("updating the message");
    const tx = await greeterContract.update("updated message asap");
    await tx.wait();

    const newMessage = await greeterContract.message();
    console.log("The new message is;", newMessage);
    
}
main();  