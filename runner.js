// Check if Metamask is installed
if (typeof window.ethereum !== 'undefined') {
  console.log('Metamask is installed!');

  // Create a new Web3 instance using the Metamask provider
  const web3 = new Web3(window.ethereum);

  // Request permission to access accounts
  window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      // Accounts now exposed
      const userAddress = accounts[0];
      console.log('User address:', userAddress);

      // Do something with the user's address
      // For example, display it on the webpage
      document.getElementById('user-address').innerHTML = userAddress;

      // Generate a 32-byte message hash
      const message = 'Hello, world!';
      const messageHash = web3.utils.keccak256(message);

      // Request permission to sign the message
      window.ethereum.request({ method: 'eth_sign', params: [userAddress, messageHash] })
        .then((signature) => {
          // Signature now exposed
          console.log('User signature:', signature);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.log('Metamask is not installed.');

  // Prompt the user to install Metamask
  alert('Please install Metamask to continue.');
}
