import { useEffect, useState } from "react";

export function Types({ isOpen, onClose, pokemonData }) {
  const [weaknesses, setWeaknesses] = useState([]);

  async function weakAgainst(type) {
    try {
      const response = await fetch(` https://pokeapi.co/api/v2/type/${type}/`);
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const data = await response.json();

      const noDamageTo = data.damage_relations.no_damage_to;
      const doubleDamageFrom = data.damage_relations.double_damage_from;
      const weaknessArray = [...noDamageTo, ...doubleDamageFrom];
      return weaknessArray;
    } catch (error) {
      console.error("error", error);
      return [];
    }
  }

  async function pokemonClass(Class) {
    try {
      const response = await fetch(
        ` https://pokeapi.co/api/v2/pokemon/${Class}/`
      );
      if (!response.ok) {
        throw new Error("failed fetching data");
      }
      const data = await response.json();
      const type = data.types[0].type.name;
      return type;
    } catch (error) {
      console.log("error fething data");
      return null;
    }
  }

  useEffect(() => {
    async function getweaknesses() {
      const type = await pokemonClass(pokemonData);
      const weakness = await weakAgainst(type);
      setWeaknesses(weakness);
    }
    getweaknesses();
  }, [pokemonData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col gap-2 bg-white z-50">
      <button className="flex justify-end p-2" onClick={onClose}>
        X
      </button>
      

      <div className="p-8">
        <span>Debilidades:</span>
        <div>
          {weaknesses.map((weakness, index) => (
            <span key={index}>{weakness.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
