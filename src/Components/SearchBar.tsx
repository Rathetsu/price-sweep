"use client";

type SearchBarProps = {};

const SearchBar: React.FC<SearchBarProps> = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar-input"
        placeholder="ُEnter product link"
      />
      <button
        type="submit"
        className="searchbar-btn"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
