import { useState,useEffect } from "react";
import { Buttons } from "./components/buttons";
import { Cards } from "./components/cards";
import { Types } from "./components/modalTypes";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";

function App() {
  const [search, setSearch] = useState('')
  const [pokemonId, setPokemonId] = useState(1)
  const [pokemonEvolutions, setPokemonEvolutions] = useState([])
  const [pokemonData, setPokemonData] = useState(null)
  const [error, setError] = useState(null)
  const [showCards, setShowCards] = useState(true)
  const [showModal, setShowModal] = useState(false)
 

 async function getPokemonClass(Class){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Class}/`)
  const data = await response.json()
  const types = data.types.map(type => {
    const typeName = type.type.name
    return typeName.charAt(0).toUpperCase() + typeName.slice(1)
  })
  return types.join(', ')
  
 }

 async function getPokemonImg(name){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  const data = await response.json()
  return data.sprites.other['official-artwork'].front_default
 }

 async function getPokemonId (id) {
  const response = await fetch(` https://pokeapi.co/api/v2/pokemon/${id}/`)
  const data = await response.json()
  return data.id
 }

 async function getEvolutions (id) {
  const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
  const data = await response.json()

 
  const pokemonEvoArray = []

  const pokemonEv1 = data.chain.species.name
  const pokemonEv1Img = await getPokemonImg(pokemonEv1)
  const pokemonId1 = await getPokemonId(pokemonEv1)
  const pokemonClass1 = await getPokemonClass(pokemonEv1)
  pokemonEvoArray.push([pokemonEv1, pokemonEv1Img, pokemonId1,pokemonClass1])

  

  if(data.chain.evolves_to.length !== 0){
    const pokemonEv2 = data.chain.evolves_to[0].species.name
    const pokemonEv2Img = await getPokemonImg(pokemonEv2)
    const pokemonId2 = await getPokemonId(pokemonEv2)
    const pokemonClass2 = await getPokemonClass(pokemonEv2)
    pokemonEvoArray.push([pokemonEv2, pokemonEv2Img,pokemonId2, pokemonClass2])
    

    if(data.chain.evolves_to[0].evolves_to.length !== 0) {
      const pokemonEv3 = data.chain.evolves_to[0].evolves_to[0].species.name
      const pokemonEv3Img = await getPokemonImg(pokemonEv3)
      const pokemonId3 = await getPokemonId(pokemonEv3)
      const pokemonClass3 = await getPokemonClass(pokemonEv3)
      pokemonEvoArray.push([pokemonEv3, pokemonEv3Img, pokemonId3, pokemonClass3])
      
     }
  }
  setPokemonEvolutions(pokemonEvoArray)
 }

 useEffect (() =>{
  getEvolutions(pokemonId)
},[pokemonId])


 const handleSearch = async (event) =>{
  event.preventDefault();
  try{
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}/`)
  if(!response.ok) {
    throw new Error('Pokemon not found')
  }
  const data = await response.json()
  setError(null)
  setShowCards(false)
  setShowModal(false)
  const pokemonImg = await getPokemonImg(data.name)
  const pokemonId = await getPokemonId(data.name)
  const pokemonClass = await getPokemonClass(data.name)
  setPokemonData({name: data.name, img: pokemonImg, id:pokemonId, class:pokemonClass})

  } catch (error) {
    setError(error.message)
    setPokemonData(null)
    setShowCards(true)
  }
}


 const prevClick = () =>{
  (pokemonId ===1)?
  setPokemonId(1):
  setPokemonId(pokemonId -1) 
 }

 const nextClick = () =>{
  setPokemonId(pokemonId +1)
 }


 const handleCardClick = () =>{
  setShowModal(true)
  

 }
 const handleCloseModal = () =>{
  setShowModal(false)
 }
 
  return (
    <main className="min-h-screen flex flex-col items-center gap-14">
    <form onSubmit={handleSearch}>
      <input
        className="py-2 px-14 mt-10 rounded-lg mr-5 text-center"
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="bg-red-500 py-2 px-5 text-white rounded-lg" type="submit">Search</button>
    </form>
    {error && <div className="text-red-600 text-2xl">{error}</div>}
    {pokemonData && ( 
     <Cards onClick ={() => handleCardClick(pokemonData)}
     key={pokemonData.name}
     name={pokemonData.name}
     img={pokemonData.img}
     id={pokemonData.id}
     Class={pokemonData.class}
     />
    )}
      {showCards && (
        <div>
        <div className="flex">
        {pokemonEvolutions.map(pokemon => 
          <Cards onClick = {() => handleCardClick ({name: pokemon[0], img: pokemon[1], id: pokemon[2], Class: pokemon[3]})}
          key={pokemon[0]} 
          name={pokemon[0]}
          img={pokemon[1]} 
          id={pokemon[2]}
          Class={pokemon[3]}
          />)}
          
        </div>
        
        <div className="flex justify-evenly mt-10 w-full">
          <Buttons icon={<TiArrowLeftOutline />}
          handleClick = {prevClick} />
          <Buttons icon={<TiArrowRightOutline />}
          handleClick = {nextClick} />
        </div>
        </div>
      )}
          {showModal &&  <Types pokemonData={pokemonData} pokemon = {pokemonData} pokemonIdData = {getPokemonId}  onClose = {handleCloseModal} isOpen = {handleCardClick}/>
        }
      
 
    </main>
  );
}

export default App;
