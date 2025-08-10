import { useState } from "react";

import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  /**
   *
   * Lifting state up (Form (child) -> App (parent)).
   *
   * This is useful when multiple sibling components need access to the same state
   *
   * We need this pattern in the first place as a direct consequence of React's one-way data flow.
   *
   */

  const [items, setItem] = useState([]);

  function handleAddItems(item) {
    // This is not allowed in React because it mutates the existing array (React prefers immutability).
    // setItem((item) => item.push(item));

    setItem((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onClearList={handleClearList}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
