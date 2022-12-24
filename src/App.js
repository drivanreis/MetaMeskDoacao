import { useState } from 'react';
import { getBnbBalance, transferBnb } from './MetaMaskService';
import './App.css';

function App() {

  const [address, setAddress] = useState('0xCE93d67fF7a7aCCBB042fFb7AA4CefEb19A322cf');
  const [balance, setBalance] = useState('');

  const [toAddress, setToAddress] = useState('0x0AcE7f96e11dF448FC026c3D67e23ECc15E6A4bf'); //Cartaira original REDE:ERC20
  //0x0AcE7f96e11dF448FC026c3D67e23ECc15E6A4bf - carteira de teste
  const [quantity, setQuantity] = useState('0.007');
  const [message, setMessage] = useState('Retorna o resumo da transsação');

  async function checkBalance() {
    let balance = await getBnbBalance(address);
    setBalance(balance);
    setMessage(``);
  }

  async function transfer() {
    let result = await transferBnb(toAddress, quantity);
    setMessage(JSON.stringify(result));
  }

  return (
    <>
      <p>
      Quando você clicar em “Ver Saldo” o algoritmo verifica:
        Se você tem o MetaMesk instalado.
        Se o mesmo estiver conectado a sua conta*.
        E mostra o saldo da conta* “ativa”.
        Você pode criar várias contas no MetaMesk. O algoritmo vai considerar somente a conta ativa no momento.
      </p>
      <p>Sua Carteira : <input type="text" className='CaixaEnd' onChange={evt => setAddress(evt.target.value)} value={address} /></p>
      <p><input type="button" className='Botao' value="Ver Saldo" onClick={evt => checkBalance()} /></p>
      <p>Saldo: {balance} em BNB</p>
      <p>To Address: <input type="text" className='CaixaEnd' onChange={evt => setToAddress(evt.target.value)} value={toAddress} /></p>
      <p>Quantidade: <input type="text" className='CaixaQuant' onChange={evt => setQuantity(evt.target.value)} value={quantity} /> BNB </p>
      <p>Valor equivalente a R$ 10,00 + taxas de R$ 0,50 / Deposito Minimo de 0.00000001 BNB</p>
      <p><input type="button" className='Botao' value="Transferir" onClick={evt => transfer()} /></p>
      <p>{message.toString().replace('"',' ')}</p>
    </>
  );
}

export default App;