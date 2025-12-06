import React, { useState } from "react";

const PetCard = ({ pet, checkNull, onLike, onDetails, onAdopt }) => {
  const [isAdopted, setIsAdopted] = useState(false);

  const handleAdopt = () => {
    setIsAdopted(true);
    onAdopt();
  };

  const pet_name = checkNull(pet.name);
  const breed = checkNull(pet.breed);
  const gender = checkNull(pet.gender);
  const rawDOB = checkNull(pet.DOB);
  const date_of_birth = rawDOB
    ? new Date(rawDOB).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-w-fit bg-base-100 border rounded-[20px]">
      <figure className="px-3 pt-3">
        <img
          src={pet.image}
          alt="pets"
          className="rounded-xl w-full object-cover"
        />
      </figure>
      <div className="p-3">
        <h2 className="text-[20px] font-bold">{pet_name}</h2>
        <div className="flex gap-1">
          <img src="/images/Frame.png" alt="Breed icon" />
          <p className="flex text-[16px] text-gray-500">Breed: {breed}</p>
        </div>
        <div className="flex gap-1 items-center">
          <img src="/images/calender.png" alt="Calendar icon" />
          <h1 className="text-[16px] text-gray-500">Birth: {date_of_birth}</h1>
        </div>
        <div className="flex gap-1">
          <img src="/images/gender.png" alt="Gender icon" />
          <h1 className="text-[16px] text-gray-500">Gender: {gender}</h1>
        </div>
        {/* <div className="flex gap-1 items-center mb-2">
          <img src="/images/dollar.png" alt="Price icon" />
          <h1 className="text-[16px] text-gray-500">Price: {price}</h1>
        </div> */}
        <hr />
        <div className="card-actions mt-3 flex justify-between">
          <button
            onClick={onLike}
            className="btn bg-inherit border border-green-text/20 rounded-[8px]"
          >
            <img src="/images/Frame 1171276315.png" alt="Like" />
          </button>
          <button
            onClick={handleAdopt}
            disabled={isAdopted}
            className={`btn bg-inherit border border-green-text/20 text-green-text text-[18px] rounded-[8px] font-bold ${
              isAdopted ? "bg-gray-300" : ""
            }`}
          >
            {isAdopted ? "Adopted" : "Adopt"}
          </button>
          <button
            onClick={onDetails}
            className="btn bg-inherit border border-green-text/20 text-green-text text-[18px] rounded-[8px] font-bold"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
