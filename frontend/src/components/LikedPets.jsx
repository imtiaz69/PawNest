import React from 'react'

const LikedPets = ({ likedPets }) => {
  return (
    <div className="border rounded-[20px] min-h-[100px] w-3/4 lg:w-1/4 grid grid-cols-2 p-3 gap-2 h-fit mx-auto mt-5 lg:mt-0">
      {likedPets.map((pet, index) => (
        <img
          key={`${pet.petId}-${index}`}
          src={pet.image}
          alt={`Liked pet ${index + 1}`}
          className="w-full object-cover rounded-lg"
        />
      ))}
    </div>
  )
}

export default LikedPets 