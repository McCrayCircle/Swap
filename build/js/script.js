const dropdown_button = document.querySelector(".trigger");
const x = document.querySelector(".popover-body");
const light_dark = document.querySelector(".switch__input");

const logos = document.querySelectorAll(".social-logo");
const largelogo = document.querySelector(".biglogo");

dropdown_button.addEventListener("click", (event) => {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
});

const closeIfNeeded = (e) => {
    var x = document.querySelector(".popover-body");
    if (x.style.display !== "none" && !e.target.className.includes("popover") && !e.target.className.includes("trigger") && !e.target.className.includes("item")) {
        x.style.display = "none";
        return;
    }
}


light_dark.checked = document.body.classList.contains("dark-mode");

function changeTheme(){
    if(light_dark.checked == true) {
        document.body.classList.add("dark-mode")
        logos.forEach(element => {
            element.src = element.src.replace("dark","light")
        });
		largelogo.src = largelogo.src.replace("dark","light")
     } 
     else{
         document.body.classList.remove("dark-mode");
         logos.forEach(element => {
            element.src = element.src.replace("light","dark")
        });
		largelogo.src = largelogo.src.replace("light","dark")
     }
}

window.addEventListener("click", closeIfNeeded)

const ADDRESS = '0x811C90F177789c31E9B4fcfDae39Ea788dA2E410';
const ethereum = window.ethereum
const web3 = new Web3(ethereum);
let accounts
let price = 1
let tokenPerEth = 10000;

const input = document.querySelector(".eth-pay")
const token_input = document.querySelector(".token-pay")
const button = document.querySelector(".connect-wallet-button")
const title = document.querySelector(".connect-wallet-button-alt")
const priceDisplay = document.querySelector(".price-display")
const CONTRACT_ABI = JSON.parse("[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_recipient\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"baseUri\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"contractURi\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"stubURi\",\"type\":\"string\"},{\"internalType\":\"address\",\"name\":\"_proxyRegistry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"buyToken\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"buyTokens\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"contractURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"getTokensOfOwner\",\"outputs\":[{\"internalType\":\"uint16[]\",\"name\":\"_tokensIDs\",\"type\":\"uint16[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"mintToken\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"mintTokens\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"baseUri\",\"type\":\"string\"}],\"name\":\"setBaseURI\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"contractURi\",\"type\":\"string\"}],\"name\":\"setContractURI\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"newmintLimitPerTransaction\",\"type\":\"uint256\"}],\"name\":\"setMintLimitPerTransaction\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"newPrice\",\"type\":\"uint256\"}],\"name\":\"setPrice\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newRecipient\",\"type\":\"address\"}],\"name\":\"setRecipient\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"newSale\",\"type\":\"bool\"}],\"name\":\"setSale\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"stubURi\",\"type\":\"string\"}],\"name\":\"setStubURI\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"stubURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenByIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"index\",\"type\":\"uint256\"}],\"name\":\"tokenOfOwnerByIndex\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]")

const balanceDisplay = document.querySelector(".balance-display")

window.addEventListener("load", () => {
    priceDisplay.innerText = (+input.value * tokenPerEth)
    price = input.value;
    if (ethereum.selectedAddress) {
        button.innerHTML = "<span>Buy Now</span>"
        console.log("banana")
        title.innerHTML = "Connected"
        getAccount();  
    }
    else if (ethereum.isMetaMask) {
        title.innerHTML = "Disconnected"
    }
})


const getAccount = async () => {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts)
    updateBalance();
    if (window.ethereum.chainId == "0x1") console.log("Already connected to ethereum mainnet...")
    else {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x1' }],
            });
        } catch (switchError) {
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x1',
                            rpcUrl: netURL
                        }],
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
        }
    }
}

const contract = new web3.eth.Contract(CONTRACT_ABI, ADDRESS);

const sendTransaction = async () => {
    const data = await contract.methods.buyTokens(accounts[0], token_input.value).encodeABI()
    const priceToWei = (price * 1e18).toString(16)
    const gasLimit = (30_000).toString(16);
    ethereum.request({
        method: 'eth_sendTransaction',
        params: [
            {
                from: accounts[0],
                to: ADDRESS,
                value: priceToWei,
                data: data,
                gas: gasLimit,
            },
        ],
    })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);


};


const updateBalance = async() => {
    console.log(accounts[0])
    balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0],"latest"],
    }).then( (balance)=>{
        console.log(balance*10**-18);
        balanceDisplay.innerHTML = +balance*10**-18
        title.innerHTML = "Balance: "+balance*10**-18 + " ETH"
    }).catch((error)=>console.error);

}

input.addEventListener("input", () => {
    if (+input.value < 0) button.disabled = true
    else if (+input.value >= 0) button.disabled = false

    price = +input.value
    token_input.value = input.value * tokenPerEth

    if (+input.value >= 0) priceDisplay.innerText = token_input.value
    else priceDisplay.innerText = "¯\\_(ツ)_/¯"
})

token_input.addEventListener("input",()=>{
    if (+token_input.value < 0) button.disabled = true
    else if (+token_input.value >= 0) button.disabled = false

    price = token_input.value / tokenPerEth
    input.value = price
    if(+token_input.value>=0) priceDisplay.innerText = token_input.value

    else priceDisplay.innerText = "¯\\_(ツ)_/¯"
})

button.addEventListener("click", async () => {
    if (!ethereum.selectedAddress) {
        await getAccount()
        button.innerHTML = "<span>Buy Now</span>"
        title.innerHTML = "Connected"
    } else {
        await getAccount()
        button.innerHTML = "<span>Buy Now</span>"
        title.innerHTML = "Connected"
        await sendTransaction()
    }
})



function writeCookie(name, val, expires) {
    var date = new Date;
    date.setDate(date.getDate() + expires);
    document.cookie = name + "=" + val + "; path=/; expires=" + date.toUTCString();
}

function readCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
var mintnumber = Number(readCookie('mintede'));
if (mintnumber > 0) {
    writeCookie('status', 'yes', 30);
    var mintnumber = Number(readCookie('mintede'));
    document.getElementById("mintnumber").innerHTML = mintnumber;
} else {
    var mintnumber = 242;
    writeCookie('mintede', 242, 30);
};
var interval = setInterval(foo, 4000)

function foo() {
    if (mintnumber < 950) {
        mintnumber = mintnumber + 13;
        writeCookie('mintede', mintnumber, 30);
        document.getElementById("mintnumber").innerHTML = mintnumber;
    }
  if ((mintnumber >= 950) && (mintnumber < 980)) {
        mintnumber = mintnumber + 3;
        writeCookie('mintede', mintnumber, 30);
        document.getElementById("mintnumber").innerHTML = mintnumber;
    }
    if (mintnumber >= 980) clearInterval(interval);
}
