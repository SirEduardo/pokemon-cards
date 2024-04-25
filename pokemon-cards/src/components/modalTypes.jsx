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

  async function pokemonClass(classType) {
    try {
      const response = await fetch(
        ` https://pokeapi.co/api/v2/pokemon/${classType}/`
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
  async function getweaknesses() {
    const type = await pokemonClass(pokemonData);
    const weakness = await weakAgainst(type);
    setWeaknesses(weakness);
  }

  useEffect(() => {
    getweaknesses();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col gap-2 bg-orange-400 z-50">
      <div className="flex justify-end p-10">
        <button className="bg-red-600 px-3 py-3 rounded-lg" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="flex gap-32">
        <div className="p-8">
          <span className="text-2xl">Weaknesses:</span>
          <div>
            {weaknesses.map((weakness, index) => (
              <span className="flex" key={index}>
                {weakness.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
