import React, { useState, useEffect } from 'react'

const AdoptionModal = ({ petId, onClose }) => {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          onClose()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-[25px] font-bold mb-2">Congratulations!</h2>
        <p className="mb-4">Adoption Process is Starting For your Pet</p>
        <p className="text-[30px] font-extrabold text-black">{countdown}</p>
      </div>
    </div>
  )
}

export default AdoptionModal 