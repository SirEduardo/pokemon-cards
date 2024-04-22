export function Buttons({ icon, handleClick }) {
  return (
    <div className="flex relative">
      <button className=" bg-red-500 text-white text-4xl px-7 py-7 rounded-full z-10 duration-200 active:translate-y-3"
      onClick={handleClick}>
        {icon}
      </button>
      <div className="bg-blue-500 px-11 py-11 rounded-full absolute z-0 mt-3 "></div>
    </div>
  );
}
