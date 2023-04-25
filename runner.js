// Check if Metamask is installed
if (typeof window.ethereum !== 'undefined') {
  console.log('Metamask is installed!');

  // Create a new Web3 instance using the Metamask provider
  const web3 = new Web3(window.ethereum);

  // Request permission to access accounts
  window.ethereum.request({ method: 'eth_requestAccounts' })
    .then(async (accounts) => {
      // Accounts now exposed
      const userAddress = accounts[0];
      console.log('User address:', userAddress);

      // Define your data object
      const data = {
        // ...
        // testing data
        // TODO: should let user input their data and generate it
        uuid: "test-uuid",
    linktree: [
      {
        key: 'official',
        label: 'Official Website',
        redirectUrl: 'https://spheron.network/',
      },
      {
        key: 'twitter',
        label: 'Twitter',
        redirectUrl: 'https://twitter.com/blockchainbalak',
      },
      {
        key: 'github',
        label: 'GitHub',
        redirectUrl: 'https://github.com/spheronFdn/',
      },
    ],
    timestamp: Date.now(),
      };

      // Stringify the data object and add Ethereum message prefix
      const message = JSON.stringify(data);
      const prefixedMessage = '\x19Ethereum Signed Message:\n' + message.length + message;

      // Hash the message using web3.utils.soliditySha3
      const messageHash = web3.utils.soliditySha3(prefixedMessage);

      // Request permission to sign the message
      const signature = await window.ethereum.request({ method: 'personal_sign', params: [messageHash, userAddress] });
      console.log('User signature:', signature);

      // Create the payload
      const payload = {
        data,
        eth_address: userAddress,
        eth_signature: signature,
      };

      // Send the payload to the server
      // ...
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.log('Metamask is not installed.');

  // Prompt the user to install Metamask
  alert('Please install Metamask to continue.');
}
