import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className='fixed w-full flex flex-col h-28 text-center items justify-center text-5xl font-staatliches uppercase bg-black text-yellow-500'>
      <div>Start Wars Movies</div>
      <div className='flex items justify-center space-x-4'>
        <Link to={"/"}>
          <span className='text-2xl text-white'>Movies</span>
        </Link>
        <Link to={`/movie/1/characters`}>
          <span className='text-2xl text-white'>Characters</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
