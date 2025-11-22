import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="lato-normal">

      <Header />
      <Banner />
      <Footer />
    </div>
  )
}

export default App
