import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
const AppMain = () => {
  const [total, setTotal] = useState(0);
  const [ip, setIp] = useState('');

  const [cart, setCart] = useState([{ id: 0, name: '', price: '', img: '' }]);

  const addToCart = (item: { id: 0,
    name: string,
    price: string,
    img:string}) => {
    setCart([item, ...cart]);
    setTotal((total) => total + parseInt(item.price));
  };
  return (
    <App
      cart={cart}
      addToCart={addToCart}
      total={total}
      setIp={setIp}
      ip={ip}
    />
  );
};
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppMain />
  </StrictMode>
);
