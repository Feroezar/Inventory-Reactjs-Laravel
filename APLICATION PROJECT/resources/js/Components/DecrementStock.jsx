import React, { useState } from "react";

function DecrementStock({ projectId }) {
  const [decrementAmount, setDecrementAmount] = useState(1);

  const handleDecrement = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const response = await fetch(route("inventory.reduce-stock"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"), // Add CSRF token
      },
      body: JSON.stringify({
        projectId,
        decrementAmount,
      }),
    });

    if (response.ok) {
      // Handle successful stock reduction (e.g., update UI, display success message)
      setDecrementAmount(1); // Reset decrement amount
    } else {
      // Handle errors (e.g., display error message to user)
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="number"
        className="px-2 py-1 mr-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-600"
        value={decrementAmount}
        onChange={(e) => setDecrementAmount(parseInt(e.target.value))} // Update state on change
      />
      <button className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600" onClick={handleDecrement}>
        Decrement
      </button>
    </div>
  );
}

export default DecrementStock;
