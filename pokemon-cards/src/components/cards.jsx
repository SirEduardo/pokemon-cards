
export function Cards({ name, img, id, Class, onClick }) {
  return (
    <div onClick = {onClick}
      className="bg-blue-500 shadow-lg shadow-black mt-32 w-72 h-80 rounded-2xl 
    flex flex-col gap-14 items-center relative overflow-hidden duration-200
    hover:cursor-pointer hover:-rotate-6 hover:-translate-y-5 "
    >
      <p className="absolute top-2 left-4 text-2xl text-white">#{id}</p>
      <p className="bg-red-500 py-2 w-2/4 absolute top-0 right-0 text-center text-white text-xl">
        {name}
      </p>
      <div className="bg-yellow-300 w-44 h-44 rounded-full absolute top-20">
        <img className="absolute z-1 " src={img} alt="pokemon-imagen" />
      </div>
      <p className="bg-white absolute rounded-md bottom-2 px-6 py-1">
      {Class}
      </p>
    </div>
  );
}
