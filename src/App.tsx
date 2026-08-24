import { Route, Routes } from "react-router";
import MainLayout from "./layout/MainLayout";
import LoadFile from "./pages/LoadFile";
import Home from "./pages/Home";
import Info from "./pages/Info";
import { CategoryPage } from "./pages/Category.page";

function App() {
  return (
    <Routes>
      <Route index element={<LoadFile />} />

      <Route element={<MainLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="info" element={<Info />} />

        <Route path="category">
          <Route index element={<Home />} />
          <Route path=":cat" element={<CategoryPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
