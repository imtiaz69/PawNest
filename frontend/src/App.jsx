import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import LoginPage from "./components/LoginPage.jsx";
import Banner from "./components/Banner.jsx";
import MainSection from "./components/MainSection.jsx";
import Footer from "./components/Footer.jsx";
import PetDetailsModal from "./components/PetDetailsModal.jsx";
import AdoptionModal from "./components/AdoptionModal.jsx";
import Shop from "./components/Shop.jsx";
import CreatePost from "./components/CreatePost.jsx";
import CategoryButton from "./components/CategoryButton.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [adoptingPetId, setAdoptingPetId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);

  const handlePetDetails = (pet) => {
    setSelectedPet(pet);
    setShowDetailsModal(true);
  };

  const handleAdoptPet = (petId) => {
    setAdoptingPetId(petId);
    setShowAdoptionModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedPet(null);
  };

  const closeAdoptionModal = () => {
    setShowAdoptionModal(false);
    setAdoptingPetId(null);
  };

  return (
    <Router>
      <div className="lato-normal">
        <Routes>
          <Route
            path="/shop"
            element={
              <>
                <Shop cart={cart} setCart={setCart} />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            }
          />
          <Route
            path="/create-post"
            element={
              <>
                <Header />
                <CreatePost />
                <Footer />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
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
                {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
