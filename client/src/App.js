import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import ProductList from "./views/ProductList";
import Form from "./views/Form";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
