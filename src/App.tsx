import Home from "./pages/Home"
import AddItems from "./pages/AddItems"
import Items from "./pages/Items"
import Checkout from "./pages/Checkout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="add-item" element={<AddItems />} />
          <Route path="items" element={<Items />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>          
  )
}

export default App
