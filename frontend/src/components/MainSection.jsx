import React, { useState, useEffect } from 'react'
import CategoryButton from './CategoryButton.jsx'
import PetCard from './PetCard.jsx'
import LikedPets from './LikedPets.jsx'
import Spinner from './Spinner.jsx'

const MainSection = ({ onPetDetails, onAdoptPet }) => {
  const [categories, setCategories] = useState([])
  const [pets, setPets] = useState([])
  const [currentPets, setCurrentPets] = useState([])
  const [likedPets, setLikedPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  // Load categories
  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then(response => response.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.log(err))
  }, [])

  // Load default pets
  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then(response => response.json())
      .then(data => {
        setPets(data.pets)
        setCurrentPets(data.pets)
      })
      .catch(err => console.log(err))
  }, [])

  const loadCategoryContents = (categoryName) => {
    setLoading(true)
    setActiveCategory(categoryName)

    setTimeout(() => {
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
          setCurrentPets(data.data)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }, 2000)
  }

  const handleSortByPrice = () => {
    if (currentPets.length === 0) return

    const sortedPets = [...currentPets].sort((a, b) => {
      const priceA = a.price || 0
      const priceB = b.price || 0
      return priceB - priceA
    })
    setCurrentPets(sortedPets)
  }

  const handleLikePet = (pet) => {
    setLikedPets(prev => [...prev, pet])
  }

  const checkNull = (value) => {
    if (value === null || value === undefined) {
      return 'Not Available'
    }
    return value
  }

  return (
    <main id="mainID" className="max-w-[1270px] mx-auto p-2">
      <div className="lg:w-[640px] mx-auto text-center">
        <h1 className="font-bold text-black text-[40px]">Adopt Your Best Friend</h1>
        <p className="text-[16px] text-gray-500">
          Finding your perfect companion has never been easier. Explore our diverse selection of pets, sort by price, and discover your new best friend today!
        </p>
      </div>

      <div className="flex justify-center mx-auto">
        <div className="md:flex grid grid-cols-2 gap-5 px justify-center lg:mx-auto ml-[50px] my-10">
          {categories.map((category) => (
            <CategoryButton
              key={category.category}
              category={category}
              isActive={activeCategory === category.category}
              onClick={() => loadCategoryContents(category.category)}
            />
          ))}
        </div>
      </div>

      {/* sort button */}
      <div className="flex justify-between items-center my-5">
        <div>
          <h1 className="text-[24px] font-extrabold">Best Deal For You</h1>
        </div>
        <div>
          <button 
            onClick={handleSortByPrice}
            className="btn bg-button-bg text-white rounded-[12px] hover:bg-button-bg/80"
          >
            Sort by Price
          </button>
        </div>
      </div>

      {/* spinner */}
      {loading && <Spinner />}

      {/* default data */}
      <section>
        <div className="lg:flex gap-5">
          <div className="min-h-[100px] w-3/4 gap-5 grid md:grid-cols-2 lg:grid-cols-3 mx-auto">
            {currentPets.length === 0 && !loading ? (
              <div className="bg-slate-50 flex flex-col items-center justify-center p-10 rounded-3xl my-6 col-span-3">
                <div className="mt-[60px]">
                  <img src="/images/error.webp" alt="No data" />
                </div>
                <div className="w-3/4 text-center">
                  <h1 className="font-bold text-[32px] text-black my-3">No Information Available</h1>
                  <p className="text-[16px] text-gray-500 mb-[60px]">No data is available to display for this category.</p>
                </div>
              </div>
            ) : (
              currentPets.map((pet) => (
                <PetCard
                  key={pet.petId}
                  pet={pet}
                  checkNull={checkNull}
                  onLike={() => handleLikePet(pet)}
                  onDetails={() => onPetDetails(pet)}
                  onAdopt={() => onAdoptPet(pet.petId)}
                />
              ))
            )}
          </div>
          <LikedPets likedPets={likedPets} />
        </div>
      </section>
    </main>
  )
}

export default MainSection 