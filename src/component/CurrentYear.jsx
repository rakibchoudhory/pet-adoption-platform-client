"use client";

import { useEffect, useState } from "react";

const CurrentYear = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    const updateYear = () => {
      setYear(String(new Date().getFullYear()));
    };

    requestAnimationFrame(updateYear);
  }, []);

  return <>{year}</>;
};

export default CurrentYear;