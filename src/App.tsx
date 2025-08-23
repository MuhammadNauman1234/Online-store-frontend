import Home from "./pages/Home"
import AddItems from "./pages/AddItem"
import Items from "./pages/Items"
import Checkout from "./pages/Checkout"
import Cart from "./pages/Cart"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layouts/MainLayout"
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="add-item" element={<AddItems />} />
            <Route path="items" element={<Items />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>          
  )
}

export default App
