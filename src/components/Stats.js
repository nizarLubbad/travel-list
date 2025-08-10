export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  //  This is what we call (Derived State) in React, because their values depend on the state value.
  //  This is better than declaring a state for each variable because they might go out of sync.
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage =
    numItems > 0 ? Math.round((numPacked / numItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `🎒 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
