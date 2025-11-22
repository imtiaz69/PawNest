import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="lato-normal">

      <Header />
      <Banner />
    </div>
  )
}

export default App
