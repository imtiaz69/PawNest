import React from 'react'

const Banner = () => {
  return (
    <div className="text-center">
      {/* banner text */}
      <div className="lg:w-[752px] mx-auto">
        <div className="flex justify-center items-center gap-5">
          <p className="text-[24px] font-bold text-gray-500">Bringing Families Together</p>
          <img src="/images/fire-emoji-201x256-e4i73qx8.png" alt="Fire emoji" width="20" />
        </div>
        <h1 className="text-[72px] font-bold my-5">Your Path to Adoption Starts Here</h1>
        <p className="text-gray-500 text-[16px]">
          At Peddy, we believe that every pet deserves a loving home. Our platform connects potential pet parents with a variety of adorable pets waiting for their forever families. With user-friendly features like dynamic categories, detailed pet profiles, and an interactive adoption process, finding your perfect companion has never been easier. Explore our diverse selection of pets, sort by price, and discover your new best friend today! <br />
          Join us in making a difference—adopt, don't shop!
        </p>
        <a href="#mainID" className="btn bg-button-bg text-white hover:bg-button-bg/80 my-5">View more</a>
      </div>
      {/* banner image */}
      <div>
        <img src="/images/pet.webp" alt="Pet banner" className="mx-auto" />
      </div>
    </div>
  )
}

export default Banner 