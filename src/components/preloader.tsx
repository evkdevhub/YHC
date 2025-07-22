import { useEffect, useState } from "react";
import "./preloader.css";

type PreloaderProps = {
  fadeOut?: boolean;
};

export default function Preloader({ fadeOut = false }: PreloaderProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (fadeOut) {
      const timeout = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [fadeOut]);

  if (hidden) return null;

  return (
    <div className={`preloader-wrapper ${fadeOut ? "hidden" : ""}`}>
      <div className="loader">
        <div className="box-load1" />
        <div className="box-load2" />
        <div className="box-load3" />
      </div>
    </div>
  );
}
