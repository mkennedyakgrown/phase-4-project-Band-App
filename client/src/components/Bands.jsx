import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Bands() {
  const { bands } = useOutletContext();
}

export default Bands;
