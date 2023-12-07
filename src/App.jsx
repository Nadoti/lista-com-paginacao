import { useEffect, useState } from "react"

function App() {
  const [posts, setPosts] = useState([])

  const [paginaAtual, setPaginaAtual] = useState(1)
  const [paginaTotal, setPaginaTotal] = useState(1)

  const URL = `https://jsonplaceholder.typicode.com/posts?_page=${paginaAtual}&_limit=10`

  async function fetchPosts(url) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      const totalCountHeader = response.headers.get('x-total-count')
      const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0
      setPaginaTotal(Math.ceil(totalCount / 10))
      setPosts(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchPosts(URL)
  }, [paginaAtual])

  function proximaPagina() {
    if(paginaAtual < paginaTotal) setPaginaAtual(paginaAtual + 1)
  }

  function anteriorPagina() {
    if(paginaAtual > 1) setPaginaAtual(paginaAtual - 1)
  }
  
  return (
    <section>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            Titulo: {post.title}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={anteriorPagina} disabled={paginaAtual === 1}>Anterior</button>
        <span>
          { `Pagina ${paginaAtual} de ${paginaTotal}` }
        </span>
        <button onClick={proximaPagina} disabled={paginaAtual === paginaTotal}>Próximo</button>
      </div>
    </section>
  )
}

export default App