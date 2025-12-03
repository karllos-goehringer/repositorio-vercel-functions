import { useEffect, useState } from 'react';

interface SpriteData {
  front_default: string;
}

interface PokemonDetails {
  sprites: SpriteData;
  types: any[]; 
}

interface PokemonCardProps {
  id: number;
  name: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => setDetails(data))
      .catch(err => console.error("Erro ao buscar detalhes do Pokémon:", err));
  }, [id]);

  if (!details) {
    return <div className="p-4 border rounded-lg bg-gray-100 flex justify-center items-center">Carregando...</div>;
  }

  return (
    <div className="border rounded-lg p-4 bg-red-200 shadow-md flex flex-col items-center">
      <img
        src={details.sprites.front_default}
        alt={name}
        className="w-24 h-24"
      />
      <p className="text-sm text-gray-400 mt-2">#{id}</p>
      <h2 className="font-semibold text-xl capitalize">{name}</h2>
    </div>
  );
};

export default PokemonCard;