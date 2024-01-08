import { useQuery } from "react-query";
import PokemonCard from "./Components/PokemonCard";

function App() {
  const { isLoading: pokemonLoading, data: pokemonData } = useQuery(
    "pokemonData",
    async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    }
  );
  return (
    <div className="w-screen h-screen flex flex-col justify-start ">
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
        <div className="w-full h-full flex flex-col justify-start items-start">
          <div className="flex justify-start items-center px-6 py-2">
            <img className="h-20" src="/pokemon.png" alt="pokemon" />
          </div>
          <div className="w-full flex flex-wrap justify-center items-center gap-6">
            {pokemonData?.results?.map((onePokemon: any, index: number) => (
              <div key={index} className="w-1/4">
                <PokemonCard pokemonUrl={onePokemon.url} />{" "}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
