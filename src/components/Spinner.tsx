import MoonLoader from "react-spinners/MoonLoader";

const Spinner = ({
  loadingText,
  loading,
}: {
  loadingText: string;
  loading: boolean;
}) => {
  return (
    <div className='h-dvh flex flex-col justify-center items-center'>
      <MoonLoader color={"#FFD700"} loading={loading} size={250} />
      <h1 className='bg-black p-4 text-3xl mt-6 text-yellow-500 font-staatliches'>
        {loadingText}
      </h1>
    </div>
  );
};

export default Spinner;
