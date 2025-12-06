import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CategoryButton from "./CategoryButton.jsx";
import PetCard from "./PetCard.jsx";
import LikedPets from "./LikedPets.jsx";
import Spinner from "./Spinner.jsx";
import { FaDog, FaCat, FaDove, FaPaw } from "react-icons/fa";

const MainSection = ({ onPetDetails, onAdoptPet, onLoginClick }) => {
  const [categories, setCategories] = useState([
    { category: "All", icon: <FaPaw /> },
    { category: "Dog", icon: <FaDog /> },
    { category: "Cat", icon: <FaCat /> },
    { category: "Bird", icon: <FaDove /> },
  ]);

  const handleAdoptPet = async (petId, petOwnerId) => {
    try {
      const user = JSON.parse(localStorage.getItem("peddy-user"));
      const user_id = user?.user_id;

      if (!user_id) {
        toast.error("Please login to adopt a pet");
        onLoginClick();
        return;
      }

      if (user_id === petOwnerId) {
        toast.error("You cannot adopt your own posted pet");
        return;
      }

      // Set adoption status to pending
      setAdoptionStatus((prev) => ({
        ...prev,
        [petId]: "pending",
      }));

      const res = await fetch("http://localhost:5000/api/pet/adopt-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: petId, user_id }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Adoption request sent successfully!");
        
        // Start polling for adoption confirmation
        const pollInterval = setInterval(async () => {
          try {
            const petRes = await fetch(`http://localhost:5000/api/pet/${petId}`);
            const petData = await petRes.json();
            
            if (petData.success && petData.pet) {
              const petStatus = petData.pet.status;
              setAdoptionStatus((prev) => ({
                ...prev,
                [petId]: petStatus,
              }));
              
              // Stop polling once adopted
              if (petStatus === "adopted") {
                clearInterval(pollInterval);
                toast.success("Adoption confirmed!");
              }
            }
          } catch (err) {
            console.error("Error polling pet status:", err);
          }
        }, 2000); // Poll every 2 seconds

        // Clear polling after 5 minutes if not adopted
        setTimeout(() => clearInterval(pollInterval), 5 * 60 * 1000);
      } else {
        // Reset adoption status on failure
        setAdoptionStatus((prev) => ({
          ...prev,
          [petId]: null,
        }));
        toast.error(data.message || "Adoption request failed.");
      }
    } catch (error) {
      setAdoptionStatus((prev) => ({
        ...prev,
        [petId]: null,
      }));
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const [pets, setPets] = useState([]);
  const [currentPets, setCurrentPets] = useState([]);
  const [likedPets, setLikedPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [adoptionStatus, setAdoptionStatus] = useState({});

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/pet/all-post")
      .then((res) => res.json())
      .then((data) => {
        setPets(data.posts);
        setCurrentPets(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch pets:", err);
        setLoading(false);
      });
  };

  const loadCategoryContents = (categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName === "All") {
      setCurrentPets(pets);
    } else {
      const filtered = pets.filter(
        (pet) => pet.category?.toLowerCase() === categoryName.toLowerCase()
      );
      setCurrentPets(filtered);
    }
  };

  const handleLikePet = (pet) => {
    setLikedPets((prev) => [...prev, pet]);
  };

  const checkNull = (value) => {
    return value === null || value === undefined ? "Not Available" : value;
  };

  return (
    <main id="mainID" className="max-w-[1270px] mx-auto p-2">
      <div className="lg:w-[640px] mx-auto text-center">
        <h1 className="font-bold text-black text-[40px]">
          Adopt Your Best Friend
        </h1>
        <p className="text-[16px] text-gray-500">
          Finding your perfect companion has never been easier. Explore our
          diverse selection of pets and discover your new best friend today!
        </p>
      </div>

      <div className="flex justify-center mx-auto">
        <div className="md:flex grid grid-cols-2 gap-5 justify-center lg:mx-auto ml-[50px] my-10">
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

      <div className="flex justify-between items-center my-5">
        <div>
          <h1 className="text-[24px] font-extrabold">
            Pets Available for Adoption
          </h1>
        </div>
      </div>

      {loading && <Spinner />}

      <section>
        <div className="lg:flex gap-5">
          <div className="min-h-[100px] w-3/4 gap-5 grid md:grid-cols-2 lg:grid-cols-3 mx-auto">
            {currentPets.length === 0 && !loading ? (
              <div className="bg-slate-50 flex flex-col items-center justify-center p-10 rounded-3xl my-6 col-span-3">
                <div className="mt-[60px]">
                  <img src="/images/error.webp" alt="No data" />
                </div>
                <div className="w-3/4 text-center">
                  <h1 className="font-bold text-[32px] text-black my-3">
                    No Information Available
                  </h1>
                  <p className="text-[16px] text-gray-500 mb-[60px]">
                    No data is available to display for this category.
                  </p>
                </div>
              </div>
            ) : (
              currentPets.map((pet) => (
                <PetCard
                  key={pet._id}
                  pet={pet}
                  checkNull={checkNull}
                  onLike={() => handleLikePet(pet)}
                  onDetails={() => onPetDetails(pet)}
                  onAdopt={() => handleAdoptPet(pet._id, pet.posted_by)}
                  onLoginClick={onLoginClick}
                  petOwnerId={pet.posted_by}
                  adoptionStatus={adoptionStatus[pet._id] || pet.status}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainSection;
