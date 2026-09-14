import React, { useState } from 'react';
import { produtos } from './data/produtos';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  // Adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCart((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === produto.id);
      if (itemExistente) {
        return prevCart.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prevCart, { ...produto, quantidade: 1 }];
    });
  };

  // Remover produto do carrinho
  const removerDoCarrinho = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calcular valor total
  const valorTotal = cart.reduce((total, item) => total + item.preco * item.quantidade, 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Checkout React - Loja Dev</h1>
        <p>Escolha seus produtos e acompanhe seu carrinho.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Vitrine de Produtos */}
        <div>
          <h2>Produtos Disponíveis</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '15px' }}>
            {produtos.map((produto) => (
              <div key={produto.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <img src={produto.imagem} alt={produto.nome} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                <h3 style={{ margin: '15px 0 10px', fontSize: '16px' }}>{produto.nome}</h3>
                <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#27ae60', marginBottom: '15px' }}>
                  R$ {produto.preco.toFixed(2)}
                </p>
                <button 
                  onClick={() => adicionarAoCarrinho(produto)}
                  style={{ backgroundColor: '#2980b9', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carrinho de Compras */}
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9', height: 'fit-content' }}>
          <h2>Carrinho de Compras</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#666', marginTop: '15px' }}>Seu carrinho está vazio.</p>
          ) : (
            <div style={{ marginTop: '15px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px', fontSize: '14px' }}>{item.nome}</h4>
                    <span style={{ fontSize: '12px', color: '#666' }}>{item.quantidade}x R$ {item.preco.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => removerDoCarrinho(item.id)}
                    style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Remover
                  </button>
                </div>
              ))}
              
              <div style={{ marginTop: '20px', borderTop: '2px solid #ddd', paddingTop: '15px' }}>
                <h3 style={{ margin: '0 0 15px' }}>Total: R$ {valorTotal.toFixed(2)}</h3>
                <button style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold', fontSize: '16px' }}>
                  Ir para o Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;