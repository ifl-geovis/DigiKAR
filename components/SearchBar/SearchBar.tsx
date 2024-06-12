import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="rounded shadow">
      <Input disabled placeholder="Suche nach einem Rechteinhaber …" />
    </div>
  );
};

export default SearchBar;
