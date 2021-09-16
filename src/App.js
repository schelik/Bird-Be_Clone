import { useState, useEffect } from 'react';
import './App.css';
import Product from './components/Product';


function App() {
  const [totalAmount, setTotalAmount] = useState(0);

  const addProductPrice = (price) => {
    setTotalAmount(totalAmount + price);
  }

  const [data, setData] = useState(null);
  useEffect(() => {
    const result = async () => {
        const response = await fetch('/api/interview');
        const data = await response.json();
        setData(data);
  }
  result();
  }, []);

  return (
    <div className="App">
      <h1 id="title">Hooray! We have your supplements ready.</h1>
      {/* Loop can be implemented */}
      <Product productName={data === null ? "Loading" : data.products[0].name.substring(0,18)} productType={data === null ? "Loading" : data.products[0].name.substring(24,28)} productLink={data === null ? "" : data.products[0].primary_image.url_standard} price={data === null ? "0" : data.products[0].price} addProductPrice={addProductPrice} />
      <Product productName={data === null ? "Loading" : data.products[1].name.substring(0,18)} productType={data === null ? "Loading" : data.products[1].name.substring(24,29)} productLink={data === null ? "" : data.products[1].primary_image.url_standard} price={data === null ? "0" : data.products[1].price}  addProductPrice={addProductPrice} />
      <h1 id="TotalAmount">Total: {totalAmount}.00 USD</h1>
    </div>
  );
}

export default App;
