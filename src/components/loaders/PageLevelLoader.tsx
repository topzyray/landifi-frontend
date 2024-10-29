import { PulseLoader } from "react-spinners";

type PageLevelLoaderProp = {
  loading: boolean;
  size?: number;
};

const PageLevelLoader = ({ loading, size }: PageLevelLoaderProp) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 text-orange-500">
      <PulseLoader
        color="orange"
        loading={loading}
        size={size && size | 10}
        data-testid="loader"
      />
      <span className="animate-pulse text-xl">Loading... Please wait.</span>
    </div>
  );
};

export default PageLevelLoader;
