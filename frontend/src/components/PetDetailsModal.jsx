import React, { useState, useEffect } from 'react'

const PetDetailsModal = ({ pet, onClose }) => {
  const [petDetails, setPetDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (pet) {
      fetch(`https://openapi.programming-hero.com/api/peddy/pet/${pet.petId}`)
        .then(response => response.json())
        .then(data => {
          setPetDetails(data.petData)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [pet])

  const checkNull = (value) => {
    if (value === null || value === undefined) {
      return 'Not Available'
    }
    return value
  }

  if (loading) {
    return (
      <dialog className="modal modal-bottom sm:modal-middle modal-open">
        <div className="modal-box">
          <div className="flex justify-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        </div>
      </dialog>
    )
  }

  if (!petDetails) {
    return null
  }

  return (
    <dialog className="modal modal-bottom sm:modal-middle modal-open">
      <div className="modal-box">
        <div>
          <img src={petDetails.image} alt="" className="w-full object-cover rounded-xl" />
        </div>
        <h1 className="font-bold text-[24px] my-2">{petDetails.pet_name}</h1>
        <div className="grid grid-cols-2 gap-1 mb-3">
          <div className="flex gap-2 items-center">
            <img src="/images/Frame.png" alt="" />
            <p className="text-gray-500 text-[16px]">Breed: {checkNull(petDetails.breed)}</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/images/calender.png" alt="" />
            <p className="text-gray-500 text-[16px]">Birth: {checkNull(petDetails.date_of_birth)}</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/images/gender.png" alt="" />
            <p className="text-gray-500 text-[16px]">Gender: {checkNull(petDetails.gender)}</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/images/dollar.png" alt="" />
            <p className="text-gray-500 text-[16px]">Price: {checkNull(petDetails.price)}</p>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/images/gender.png" alt="" />
            <p className="text-gray-500 text-[16px]">Vaccinated Status: {checkNull(petDetails.vaccinated_status)}</p>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <h1 className="font-semibold text-black text-[16px] mb-3">Details Information</h1>
          <p className="text-[16px] text-gray-500">{petDetails.pet_details}</p>
        </div>
        <div className="modal-action items-center">
          <form method="dialog" className="w-full items-center">
            <button onClick={onClose} className="btn bg-button-bg/20 w-full rounded-[30px]">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default PetDetailsModal 