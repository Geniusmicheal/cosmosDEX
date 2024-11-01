import { useState } from 'react';
import { networkSelectHandler, walletConnectHandler } from './Service';

function App(this: any) {
   const [network, setNetwork]:any = useState({
      type:"",
      auth: false
   });



   return ( <>
      <form>
         <select onChange={networkSelectHandler.bind(this,[setNetwork])}>
            <option disabled selected>Select your network</option>
            <option>Evm</option>
            <option>Cosmos</option>
         </select>
         <button type="button" disabled={network.auth} onClick={walletConnectHandler.bind(this,[network, setNetwork])}>
            {network.auth? network?.address: "Connect Wallet" }
         </button>
      </form>

      <h2>Active Wallet Address</h2>
      <h3>{network?.address}</h3>
      <h3>Network: {network?.type}</h3>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Cosmos DEX</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Connect Wallet
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the button to connect your Testnet wallet
      </p> */}
   </> )
}
     

export default App
