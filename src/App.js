import React, { useState } from "react"
import { db } from './fireBaseConnection'
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'
import "./app.css"

function App() {
 const [titulo, setTitulo] = useState('')
 const [autor, setAutor] = useState('')
 const [carregando, setCarregando] = useState(false)

 async function handleAdd(e) {
  e.preventDefault()

  // Trava de segurança contra cliques duplos
  if (carregando) return;

  // Validação para evitar envios em branco
  if (titulo.trim() === '' || autor.trim() === '') {
    alert("Preencha todos os campos antes de enviar!")
    return; 
  }

  try {
    // Ativa a trava/loading
    setCarregando(true)

    /*
    // =========================================================
    // OPÇÃO 1: Salvando com ID Manual / Estático (Comentada)
    // Use se precisar de um ID fixo definido por você
    // =========================================================
    await setDoc(doc(db, "posts", "123456"), {
      titulo: titulo,
      autor: autor,
    });
    */

    // =========================================================
    // OPÇÃO 2: Salvando com ID Único e Dinâmico (Ativa / Funcionando)
    // O Firebase gera um ID automático e exclusivo para cada post
    // =========================================================
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor
    });

    alert("Dados enviados com sucesso!")
    console.log("Dados salvos com sucesso!")

    // Limpa os campos após o sucesso
    setTitulo('')
    setAutor('')

  } catch (error) {
    console.log("Gerou erro: " + error)
    alert("Ocorreu um erro ao salvar")
  } finally {
    // Garante que a trava é removida tanto no sucesso quanto no erro
    setCarregando(false)
  } 
}


  return (
    <div className="container-conteudo">
      <div className="container-conteudo2">
      <h1>React JS + Firebase :)</h1>

      <div className="container-campos">
        
        <label className="titulo">Titulo:</label>
        <textarea 
          className="area-titulo" 
          type="text" 
          placeholder='digite o titulo' 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          disabled={carregando} 
        />
        
        <label className="autor">Autor:</label>
        <input 
          className="input-autor" 
          type="text" 
          placeholder='Autor do Post' 
          value={autor} 
          onChange={(e) => setAutor(e.target.value)} 
          disabled={carregando}
        />
        
        <button 
          className="botao" 
          onClick={handleAdd}
          disabled={carregando}
        >
          {carregando ? "Salvando..." : "Enviar"}
        </button>


       </div>
      </div>
    </div>
  );
}

export default App;