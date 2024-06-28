import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="p-12">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
