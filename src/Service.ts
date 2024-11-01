import Web3 from 'web3';

export const walletConnectHandler = async ([network, setNetwork]:any,_:any) => {
   const {type}= network,
   like = (type=="Cosmos"? "Keplr":"MetaMask"),
   {ethereum, keplr, getOfflineSigner}:any = window;

   if(!type) return alert("Please select your network");
   
   try {
      
      const accountObj: { [key: string]: () => Promise<void> } = {
         Evm: async () => {
            if (!ethereum) return alert(`Please install a compatible ${type} wallet (like ${like})`);
            await ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(ethereum);
            const accounts = await web3.eth.getAccounts();
            setNetwork({
               type:"Evm",
               auth: true,
               address: accounts[0]
            });
         },
         Cosmos:  async () => {
            if (!getOfflineSigner) return alert(`Please install a compatible ${type} wallet (like ${like})`);
            
            const chainId = "evmos_9001-2";
            await keplr.enable(chainId);

            const accounts = await getOfflineSigner(chainId).getAccounts();
            setNetwork({
               type:"Cosmos",
               auth: true,
               address: accounts[0].address
            });
         }
   
      }
      await accountObj[type]()
   } catch (error) { console.error('User denied account access:', error); }

}


export const networkSelectHandler = ([setNetwork]:any,e:any)=> {
   const targeted = e.target.value;
   setNetwork({
      type: targeted,
      auth: false
   });
   // setNetwork
}

