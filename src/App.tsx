import { useQuery } from "react-query";
import PokemonCard from "./Components/PokemonCard";
import { useState } from "react";
import { QueryClient } from "react-query";
import { Result } from "./datamodels/models";

function App() {
  const queryClient = new QueryClient();
  const [loadUrl, setLoadUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const { isLoading: pokemonLoading, data: pokemonData } = useQuery(
    "pokemonData",
    async () => {
      const response = await fetch(`${loadUrl}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
    {
      cacheTime: 3600000,
    }
  );

  const handleLoadMore = async () => {
    setLoadUrl(pokemonData.next);
    await queryClient.invalidateQueries("pokemonData");
  };

  const handleLoadPrevious = async () => {
    console.log("next");
    setLoadUrl(pokemonData.previous);
    await queryClient.invalidateQueries("pokemonData");
  };

  const [searchInput, setSearchInput] = useState<string>("");

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredPokemon = pokemonData?.results.filter((item: Result) => {
    const searchString = searchInput.toLowerCase();
    return item.name.includes(searchString);
  });

  console.log(filteredPokemon);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-start bg-[#242424]">
        {pokemonLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <div className="flex justify-start px-4 py-2">
              <img src="/pokemon.png" alt="pokemon" />
            </div>
            <p className="text-yellow-300 font-bold text-xl">
              Pokemons Loading...
            </p>
          </div>
        ) : (
          <>
            <div className="w-full h-full flex flex-col justify-start items-start gap-2 mb-5">
              <div className="w-full flex justify-around items-center py-2">
                <img className="h-20" src="/pokemon.png" alt="pokemon" />
                <input
                  className="w-1/3 p-2 border rounded-md"
                  type="text"
                  placeholder="Search Pokemon by Name"
                  value={searchInput}
                  onChange={handleChangeSearch}
                />
              </div>
              <div className="w-full flex flex-wrap justify-center items-center gap-6 p-2">
                {filteredPokemon ? (
                  <>
                    {" "}
                    {filteredPokemon?.map((onePokemon: Result, index: number) => (
                      <div key={index} className="w-full md:w-1/2 lg:w-1/4">
                        <PokemonCard pokemonUrl={onePokemon.url} />{" "}
                      </div>
                    ))}
                  </>
                ) : (
                  <p>NO POKEMON MATCH YOUR SEARCH</p>
                )}
              </div>
              <div className="w-full justify-center gap-10 flex px-6">
                <button
                  className="hover:bg-[#008080] disabled:bg-slate-200 disabled:cursor-not-allowed"
                  disabled={!pokemonData.previous}
                  onClick={handleLoadPrevious}
                >
                  Previous
                </button>
                <button className="hover:bg-[#008080]" onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
