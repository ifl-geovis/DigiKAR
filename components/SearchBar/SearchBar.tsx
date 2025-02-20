import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="rounded bg-white shadow-sm">
      <Input disabled placeholder="Suche nach einem Rechteinhaber …" />
    </div>
  );
};

export default SearchBar;
