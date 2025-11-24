import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import LoginPage from './components/LoginPage.jsx'
import Banner from './components/Banner.jsx'
import MainSection from './components/MainSection.jsx'
import Footer from './components/Footer.jsx'
import PetDetailsModal from './components/PetDetailsModal.jsx'
import AdoptionModal from './components/AdoptionModal.jsx'

function App() {
  const [selectedPet, setSelectedPet] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showAdoptionModal, setShowAdoptionModal] = useState(false)
  const [adoptingPetId, setAdoptingPetId] = useState(null)
  const [showLogin, setShowLogin] = useState(false);

  const handlePetDetails = (pet) => {
    setSelectedPet(pet)
    setShowDetailsModal(true)
  }

  const handleAdoptPet = (petId) => {
    setAdoptingPetId(petId)
    setShowAdoptionModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedPet(null)
  }

  const closeAdoptionModal = () => {
    setShowAdoptionModal(false)
    setAdoptingPetId(null)
  }

  return (
    <div className="lato-normal">
      <Header onLoginClick={() => setShowLogin(true)} />
      <Banner />
      <MainSection 
        onPetDetails={handlePetDetails}
        onAdoptPet={handleAdoptPet}
      />
      <Footer />

      {showDetailsModal && selectedPet && (
        <PetDetailsModal 
          pet={selectedPet} 
          onClose={closeDetailsModal}
        />
      )}

      {showAdoptionModal && (
        <AdoptionModal 
          petId={adoptingPetId}
          onClose={closeAdoptionModal}
        />
      )}

      {showLogin && (
        <LoginPage onClose={() => setShowLogin(false)} />
      )}
    </div>
  )
}

export default App 