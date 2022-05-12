require("dotenv").config();
const alchemyKey = process.env.URL_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = require("../contract-abi.json")


export const greeterContract = new web3.eth.Contract(contractAddress, abi);

export const loadCurrentMessage = async () => {
    const message = await greeterContract.methods.message().call();
    return message;
  
};

export const connectWallet = async () => {
    if(window.ethereum){
        try {
            const addressArray = window.ethereum.request({ method: "eth_requestAccounts", });
            const obj = {
                status: "Write a message above",
                address: addressArray[0],
            };
            return obj;
        } catch (err) {
            return {
                address: "",
                status: err.message,
            };
            
        }
    } else {
        return {
            address: "",
            status: "",
        }
    }
  
};

export const getCurrentWalletConnected = async () => {
    if(window.ethereum){
        try {
            const addressArray = await window.ethereum.request({ method: "eth_accounts", });
            if (addressArray > 0) {
                return {
                    address: addressArray[0],
                    status: "Write a message in the field above",
                };
            } else {
                return {
                    address: "",
                    status: "Connect to metamask using the top right button",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: err.message,
            };
        }
    } else {
        return {
            address: "",
            status: "Install metamask to your browser"
        }
    }
  
};

export const updateMessage = async (address, message) => {
  
};
