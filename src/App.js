import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  /**
   *
   * Lifting state up (Form (child) -> App (parent)).
   *
   * This is useful when multiple siblings component need access to the same state
   *
   * We need this pattern in the first place as a direct consequence of React one-way data flow.
   *
   */

  const [items, setItem] = useState([]);

  function handleAddItems(item) {
    // This is not allowed in React because it mutates the existing array (React prefers immutability).
    // setItem((item) => item.push(item));

    setItem((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🎒</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <div className="stats">
      🎒 You have X items on your list, and you already packed X (X%)
    </div>
  );
}
