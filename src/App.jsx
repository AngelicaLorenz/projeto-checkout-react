import React from 'react';
import { produtos } from './data/produtos';
import './App.css';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Checkout React - Loja Dev</h1>
        <p>Escolha seus produtos e avance para o checkout.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {produtos.map((produto) => (
          <div key={produto.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <img src={produto.imagem} alt={produto.nome} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ margin: '15px 0 10px' }}>{produto.nome}</h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>{produto.descricao}</p>
            <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#27ae60' }}>
              R$ {produto.preco.toFixed(2)}
            </p>
            <button style={{ backgroundColor: '#2980b9', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;