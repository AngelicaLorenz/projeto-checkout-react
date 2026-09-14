import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './App.css';

// Carrinho Fixo com 3 itens (RF01, RF02)
const carrinhoFixo = [
  { id: 1, nome: 'Teclado Mecânico RGB', precoUnitario: 250.00, quantidade: 1 },
  { id: 2, nome: 'Mouse Gamer Ergonômico', precoUnitario: 120.00, quantidade: 2 },
  { id: 3, nome: 'Headset Surround 7.1', precoUnitario: 300.00, quantidade: 1 },
];

// Esquema de validação com Zod (RF06)
const pagamentoSchema = z.object({
  titular: z.string().min(3, 'Nome do titular é obrigatório'),
  cartao: z.string()
    .transform((val) => val.replace(/[\s-]/g, '')) // Desconsidera espaços e hífens
    .pipe(z.string().regex(/^\d{16}$/, 'O cartão deve conter exatamente 16 dígitos')),
  validade: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido. Use MM/AA (mês entre 01 e 12)'),
  cvv: z.string().regex(/^\d{3}$/, 'O CVV deve conter exatamente 3 dígitos'),
});

function App() {
  const [etapa, setEtapa] = useState('carrinho'); // 'carrinho', 'pagamento', 'sucesso', 'falha'
  const [processando, setProcessando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(pagamentoSchema),
  });

  // Cálculo do valor total da compra (RF03)
  const valorTotal = carrinhoFixo.reduce((acc, item) => acc + (item.precoUnitario * item.quantidade), 0);

  // Simulação assíncrona de pagamento e regra antifraude (RF07, RF08, RF09)
  const onSubmitPagamento = (data) => {
    setProcessando(true);

    setTimeout(() => {
      setProcessando(false);

      // Regra antifraude: se todos os 16 dígitos forem iguais, é tentativa de golpe (RF07, RF11)
      const digitos = data.cartao;
      const todosIguais = digitos.split('').every((digito) => digito === digitos[0]);

      if (todosIguais) {
        setEtapa('falha');
      } else {
        setEtapa('sucesso');
      }
    }, 2000); // Simula 2 segundos de processamento assíncrono (RF08)
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Checkout Profissional</h1>
        <p>Sistema de pagamento seguro com simulação antifraude</p>
      </header>

      {/* TELA 1: CARRINHO DE COMPRAS / RESUMO (RF01, RF02, RF03, RF04) */}
      {etapa === 'carrinho' && (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <h2>Resumo do Carrinho</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>Produto</th>
                <th style={{ padding: '8px' }}>Preço Unitário</th>
                <th style={{ padding: '8px' }}>Qtd</th>
                <th style={{ padding: '8px' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrinhoFixo.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px' }}>{item.nome}</td>
                  <td style={{ padding: '8px' }}>R$ {item.precoUnitario.toFixed(2)}</td>
                  <td style={{ padding: '8px' }}>{item.quantidade}</td>
                  <td style={{ padding: '8px' }}>R$ {(item.precoUnitario * item.quantidade).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <h3>Total da Compra: R$ {valorTotal.toFixed(2)}</h3>
            <button 
              onClick={() => setEtapa('pagamento')}
              style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}

      {/* TELA 2: PAGAMENTO / FORMULÁRIO (RF05, RF06, RF08) */}
      {etapa === 'pagamento' && (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <h2>Dados de Pagamento</h2>
          <p>Total a pagar: <strong>R$ {valorTotal.toFixed(2)}</strong></p>

          <form onSubmit={handleSubmit(onSubmitPagamento)} style={{ marginTop: '15px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Nome do Titular:</label>
              <input 
                type="text" 
                {...register('titular')} 
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="Nome impresso no cartão"
              />
              {errors.titular && <span style={{ color: 'red', fontSize: '12px' }}>{errors.titular.message}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Número do Cartão (16 dígitos):</label>
              <input 
                type="text" 
                {...register('cartao')} 
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                placeholder="0000 0000 0000 0000"
              />
              {errors.cartao && <span style={{ color: 'red', fontSize: '12px' }}>{errors.cartao.message}</span>}
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Validade (MM/AA):</label>
                <input 
                  type="text" 
                  {...register('validade')} 
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  placeholder="MM/AA"
                />
                {errors.validade && <span style={{ color: 'red', fontSize: '12px' }}>{errors.validade.message}</span>}
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>CVV:</label>
                <input 
                  type="password" 
                  maxLength={3} 
                  {...register('cvv')} 
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  placeholder="123"
                />
                {errors.cvv && <span style={{ color: 'red', fontSize: '12px' }}>{errors.cvv.message}</span>}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => setEtapa('carrinho')}
                disabled={processando}
                style={{ backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Voltar ao Carrinho
              </button>

              <button 
                type="submit" 
                disabled={processando}
                style={{ backgroundColor: processando ? '#95a5a6' : '#2980b9', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: processando ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
              >
                {processando ? 'Processando compra...' : 'Pagar Agora'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TELA 3: SUCESSO (RF10) */}
      {etapa === 'sucesso' && (
        <div style={{ textAlign: 'center', padding: '40px', border: '1px solid #27ae60', borderRadius: '8px', backgroundColor: '#e8f8f5' }}>
          <h2 style={{ color: '#27ae60' }}>Compra Aprovada com Sucesso! 🎉</h2>
          <p style={{ margin: '20px 0', fontSize: '16px' }}>Seu pagamento foi processado e confirmado com sucesso.</p>
          <button 
            onClick={() => setEtapa('carrinho')}
            style={{ backgroundColor: '#2980b9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Voltar ao Carrinho
          </button>
        </div>
      )}

      {/* TELA 4: FALHA / TENTATIVA DE GOLPE (RF11) */}
      {etapa === 'falha' && (
        <div style={{ textAlign: 'center', padding: '40px', border: '1px solid #e74c3c', borderRadius: '8px', backgroundColor: '#f5b7b1' }}>
          <h2 style={{ color: '#c0392b' }}>Falha na Transação</h2>
          <p style={{ margin: '20px 0', fontSize: '18px', fontWeight: 'bold', color: '#78281f' }}>
            tentativa de golpe
          </p>
          <button 
            onClick={() => setEtapa('pagamento')}
            style={{ backgroundColor: '#c0392b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
}

export default App;