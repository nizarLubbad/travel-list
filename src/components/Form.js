import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // React will pass the event object to the handleSubmit function when a submit event occurs
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItems(newItem);
    console.log(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥰 trip?</h3>

      {/**
       *
       * CONTROLLED ELEMENTS:
       * 1- Declare a piece of state.
       * 2- Use this state on the element you want to control using the value property.
       * 3- Update that state value with the onChange handler.
       *
       *
       * (e.target.value) in select element is coming directly form the option element,
       * so you need to set the value property there too.
       *
       * */}

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
