// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
    //goerli
  // const superTokenFactory = "0x94f26B4c8AD12B18c12f38E878618f7664bdcCE2"  
  // const sf =  "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9"
  // const cfa = "0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8"
  // const DAI = await ethers.getContractAt("MySuperToken","0x3B4abEA3882475a435d3fE749d03Fbb9C90D39CE",deployer);
  // const DAO = await ethers.getContractAt("MySuperToken","0x3d3e39FFb1dAD0fCf1274BA63ec9cAF8DF1f5BD7",deployer);

  // mumbai
  const superTokenFactory = "0x200657E2f123761662567A1744f9ACAe50dF47E6"  
  const sf =  "0xEB796bdb90fFA0f28255275e16936D25d3418603"
  const cfa = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873"
  const DAI = await ethers.getContractAt("MySuperToken","0xB26E7eb409B11868cA2891750dbAba02618F571e",deployer);
  const DAO = await ethers.getContractAt("MySuperToken","0xf59f780ed13D3dC45983a37206bA95E5D138609A",deployer);

  
  await DAI.mint("0x29c17de4e2e8C21297187aF8F341322dE5b88812",ethers.utils.parseEther('1000000'))
  await DAO.mint("0x29c17de4e2e8C21297187aF8F341322dE5b88812",ethers.utils.parseEther('1000000'))
  // Already initialized, use in case we need to redeplouyt
  // await DAI.initialize('SuperDAIx','SDAIx',ethers.utils.parseEther('1000000'))
  // await DAO.initialize('SuperGOVx','SGOVx',ethers.utils.parseEther('1000000'))

  console.log(DAI.address,DAO.address);
  // const provider = new ethers.providers.JsonRpcProvider();

  // const signer = provider.getSigner();

  // await signer.sendTransaction({
  //   to: "0x759E32a6a85667276cBa40B5ABdf5B28Dd400FDa",
  //   value: ethers.utils.parseEther("1"),
  // });


  //   await deploy("Vesting", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   args: [ sf,cfa,DAO.address,DAI.address,"0xD8640c83A7231CCd9589b84A61cd22E6eD528EAB","0x759E32a6a85667276cBa40B5ABdf5B28Dd400FDa","0x759E32a6a85667276cBa40B5ABdf5B28Dd400FDa",1791510754],
  //   log: true,
  //   waitConfirmations: 5,
  // });  

  
  
  // Getting a previously deployed contract
  const Vesting = await ethers.getContract("Vesting", deployer);
  console.log(Vesting.address)
  /*  await YourContract.setPurpose("Hello");
  
    // To take ownership of yourContract using the ownable library uncomment next line and add the 
    // address you want to be the owner. 
    
    await YourContract.transferOwnership(
      "ADDRESS_HERE"
    );

    //const YourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       constructorArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["YourContract"];
