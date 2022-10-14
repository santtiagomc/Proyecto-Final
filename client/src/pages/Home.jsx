import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
  <div>

      <div>
      Buenos dias
      </div>
    <Link to="/create">
      <button>CREAR</button>
    </Link>
    </div>
)
}
