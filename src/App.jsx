import React, { useState } from 'react';
import { produtos } from './data/produtos';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [etapa, setEtapa] = useState('catalogo'); // 'catalogo' ou 'checkout'
  const [dadosCliente, setDadosCliente] = useState({ nome: '', email: '', endereco: '' });
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

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

  // Finalizar compra
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setPedidoFinalizado(true);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Checkout React - Loja Dev</h1>
        <p>Aplicação desenvolvida com React, Vite e Git Flow.</p>
      </header>

      {pedidoFinalizado ? (
        <div style={{ textAlign: 'center', padding: '40px', border: '1px solid #27ae60', borderRadius: '8px', backgroundColor: '#e8f8f5' }}>
          <h2 style={{ color: '#27ae60' }}>Pedido Finalizado com Sucesso! 🎉</h2>
          <p style={{ fontSize: '16px', color: '#333', marginTop: '15px' }}>
            Obrigado, <strong>{dadosCliente.nome}</strong>! Um e-mail de confirmação foi enviado para <strong>{dadosCliente.email}</strong>.
          </p>
          <p style={{ color: '#666' }}>Seu pedido será entregue em: {dadosCliente.endereco}</p>
          <button 
            onClick={() => { setCart([]); setPedidoFinalizado(false); setEtapa('catalogo'); }}
            style={{ marginTop: '20px', backgroundColor: '#2980b9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Voltar ao Início
          </button>
        </div>
      ) : etapa === 'catalogo' ? (
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
                  <button 
                    onClick={() => setEtapa('checkout')}
                    style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', width: '100%', fontWeight: 'bold', fontSize: '16px' }}
                  >
                    Ir para o Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Tela de Checkout / Formulário */
        <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', padding: '30px', backgroundColor: '#f9f9f9' }}>
          <h2>Finalizar Pedido</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>Total do pedido: <strong>R$ {valorTotal.toFixed(2)}</strong></p>
          
          <form onSubmit={handleCheckoutSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome Completo:</label>
              <input 
                type="text" 
                required 
                value={dadosCliente.nome}
                onChange={(e) => setDadosCliente({...dadosCliente, nome: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Seu nome"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>E-mail:</label>
              <input 
                type="email" 
                required 
                value={dadosCliente.email}
                onChange={(e) => setDadosCliente({...dadosCliente, email: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="seu@email.com"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Endereço de Entrega:</label>
              <input 
                type="text" 
                required 
                value={dadosCliente.endereco}
                onChange={(e) => setDadosCliente({...dadosCliente, endereco: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Rua, número, bairro, cidade"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setEtapa('catalogo')}
                style={{ backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', width: '50%', fontWeight: 'bold' }}
              >
                Voltar ao Carrinho
              </button>
              <button 
                type="submit" 
                style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', width: '50%', fontWeight: 'bold' }}
              >
                Confirmar Compra
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;