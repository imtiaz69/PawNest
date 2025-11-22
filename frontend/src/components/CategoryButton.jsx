import React from 'react'

const CategoryButton = ({ category, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`category-btn btn size-[100px] lg:size-fit rounded-xl flex p-3 px-8 gap-3 bg-inherit items-center border-blue-100 ${
        isActive ? 'bg-green-100 rounded-[50px]' : ''
      }`}
    >
      <img src={category.category_icon} alt={category.category} />
      <p className="font-bold text-black text-[24px]">{category.category}</p>
    </button>
  )
}

export default CategoryButton 