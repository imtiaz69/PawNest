import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
import MainSection from './components/MainSection'
import PetDetailsModal from './components/PetDetailsModal'

function App() {
  const [selectedPet, setSelectedPet] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const handlePetDetails = (pet) => {
    setSelectedPet(pet)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedPet(null)
  }

  return (
    <div className="lato-normal">
      <Header />
      <Banner />
      <MainSection 
        onPetDetails={handlePetDetails}
      />
      <Footer />
      
      {showDetailsModal && selectedPet && (
        <PetDetailsModal 
          pet={selectedPet} 
          onClose={closeDetailsModal}
        />
      )}
    </div>
  )
}


export default App
