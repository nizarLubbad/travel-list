export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🎒</h1>;
}

function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your 🥰 trip?</h3>
    </div>
  );
}

function PackingList() {
  return <div className="list">Packing List Section</div>;
}
