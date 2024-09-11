import { Dropdown } from "./components/Dropdown";

import "./App.scss";

const App: React.FC = () => {
  const options = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
    { label: "Item 9", value: "9" },
  ];

  const handleSelect = (option: { label: string; value: string }) => {
    console.log("Selected option:", option);
  };

  return (
    <div className="container">
      <Dropdown
        className="custom-width"
        options={options}
        onSelect={handleSelect}
        placeholder="Оберіть ваше місто"
      />
      <Dropdown
        options={options}
        onSelect={handleSelect}
        placeholder="Оберіть ваше місто"
      />
    </div>
  );
};

export default App;
