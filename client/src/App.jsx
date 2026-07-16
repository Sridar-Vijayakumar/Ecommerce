import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../src/pages/Home";

function App() {
  return (
    <div>App</div>
  )
}

<BrowserRouter>
<Routes>
  <Route
  path="/home"
  element={<Home/>}/>

  <Route
  path="/product/:id"
  element={<ProductDetails />}
/>
</Routes>
</BrowserRouter>

export default App