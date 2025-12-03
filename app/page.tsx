"use client"

import { useEffect, useState } from "react"
import PokemonCard from "./pokecard";

interface PokemonSpecies {
  name: string;
  url: string;
}

interface PokemonEntry {
  entry_number: number;
  pokemon_species: PokemonSpecies;
}

interface PokedexData {
  id: number;
  name: string;
  pokemon_entries: PokemonEntry[];
}


export default function ProductsPage() {
  const [pokedexData, setPokedexData] = useState<PokedexData | null>(null);
  const [geracaoPokemon, setGeracaoPokemon] = useState("kanto");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true); 
    setError(null);

    fetch("/api/products" + `?geracao=${geracaoPokemon}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao buscar dados: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // 4. Armazena o objeto completo (ex: {..., pokemon_entries: [...]})
        setPokedexData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [geracaoPokemon]); 


  if (loading) return <div className="p-8">Loading pokémons from {geracaoPokemon}...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  
  const entries = pokedexData?.pokemon_entries || [];

  return (
    <main className="p-8 bg-red-100 min-h-screen">
      <div className="flex flex-row justify-center items-center mb-8">
    <img 
        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png'} 
        alt="Pokemon Logo" 
        className="w-16 mr-4" // Adicionado 'mr-4' para espaçamento à direita da imagem
    />
    <h1 className="text-3xl font-bold">
        Pokémons da Geração {geracaoPokemon.toUpperCase()}
    </h1>
</div>
      <select
        value={geracaoPokemon} 
        onChange={(e) => {
          setGeracaoPokemon(e.target.value); 
        }}
      >
        <option value="kanto">Kanto</option>
        <option value="johto">Johto</option>
        <option value="hoenn">Hoenn</option>
        <option value="sinnoh">Sinnoh</option>
        <option value="unova">Unova</option>
        <option value="kalos">Kalos</option>
        <option value="alola">Alola</option>
        <option value="galar">Galar</option>
        <option value="paldea">Paldea</option>
      </select>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
        {entries.map((entry) => (
          <div key={entry.entry_number} className="border rounded-lg p-4 bg-red-500 shadow-md ">
            <PokemonCard id={parseInt(entry.pokemon_species.url.split('/').slice(-2, -1)[0])} name={entry.pokemon_species.name} />
          </div>
        ))}
      </div>
      
      {entries.length === 0 && !loading && (
          <p className="mt-4">Nenhum Pokémon encontrado para esta geração.</p>
      )}
    </main>
  )
}