import { ethers } from 'ethers';

async function getMetaMaskProvider() {
    if (!window.ethereum) throw new Error(`No MetaMask found!`);
    //await window.ethereum.send('eth_requestAccounts');
    await window.ethereum.request({ method: 'eth_requestAccounts' });  //conecta ao MetaMesk

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) window.location.reload();
    });
    return provider;
}

export async function getBnbBalance(address) {
    const provider = await getMetaMaskProvider();
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance.toString());
}

export async function transferBnb(toAddress, quantity) {
    const provider = await getMetaMaskProvider();
    const signer = provider.getSigner();
    ethers.utils.getAddress(toAddress);  //valida endereço

    const tx = await signer.sendTransaction({
        to: toAddress,
        value: ethers.utils.parseEther(quantity)
    });

    return tx;
}