import { useQuery } from "react-query";

const PokemonCard = ({ pokemonUrl }) => {

  console.log(pokemonUrl);
  const { data: onePokemonData, isLoading } = useQuery(
    ["onePokemon", pokemonUrl],
    async () => {
      const response = await fetch(`${pokemonUrl}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full border bg-white h-full rounded-md flex flex-col gap-2 items-center justify-center text-black p-2">
      <p className="font-semibold text-xl px-4 border-b pb-2 w-full text-left">
        {onePokemonData.forms[0].name.toUpperCase()}
      </p>
      <img
        className={`h-40 border rounded-3xl shadow-2xl bg-[${onePokemonData.types[0]}]`}
        src={onePokemonData.sprites.other["official-artwork"].front_default}
        alt="pokemon"
      />
      <p className="font-medium text-xl border-b pb-2">Types:</p>
      <div className="w-full flex justify-between">
        {onePokemonData.types.map((oneType: any) => (
          <p className="w-full text-center font-semibold leading-8 text-2xl ">{oneType.type.name.toUpperCase()}</p>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
