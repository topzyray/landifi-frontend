const SearchProperty = () => {
  return (
    <div className="flex justify-end py-4 px-5 sticky z-40 top-14 right-0">
      <input
        type="search"
        name="searchProperty"
        placeholder="Search properties"
        id=""
        className="input w-full max-w-[17rem] rounded-l-3xl rounded-r-none"
      />
      <button className="btn btn-primary-outline rounded-l-none rounded-r-3xl">
        Search
      </button>
    </div>
  );
};

export default SearchProperty;
