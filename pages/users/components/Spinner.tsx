import React from "react";
import { PulseLoader } from "react-spinners";

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <div className="flex justify-center items-start h-screen">
      <PulseLoader
        color={"#123abc"}
        loading={loading}
      />
    </div>
  );
};

export default Spinner;
