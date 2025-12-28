import { BeatLoader } from "react-spinners";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const DefaultLoading = () => {
  return (
   <BeatLoader
        color={"#FFFFFF"}
        loading={true}
        cssOverride={override}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
};
