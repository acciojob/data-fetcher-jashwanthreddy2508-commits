import { useEffect, useState } from 'react'


function App() {
  const [data, setdata] = useState([])
  const[error,seterror]=useState("")
  const[loading,setloading]=useState(true)

  useEffect(() => {
    async function getdata() {
      try {
        const response = await fetch("https://dummyjson.com/products")
        if (!response.ok) {
          throw new Error("failed to fetch data")
        }
        const result = await response.json()
        setdata(result.products)
      } catch (err) {
        seterror(err.message)
      }finally{
        setloading(false)
      }
    }

    getdata()
  }, [])

  return (
    <>
      {
        loading && <p>Loading products...</p>
      }
      {
        error && <p>Couldnt load products</p>
      }
      {!loading && !error && (
  <pre>
    {data.map((product) => (
      <pre key={product.id}>
        <h2>{product.title}</h2>
        <img src={product.thumbnail} alt={product.title} width="150" />
        <p>${product.price}</p>
      </pre>>
    ))}
  </pre>
)}
    </>
  )
}

export default App
