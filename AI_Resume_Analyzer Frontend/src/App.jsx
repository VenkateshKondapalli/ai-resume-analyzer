import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/Homepage";
import { AnalyzePage } from "./pages/analyzepage";
import { PageNotFound } from "./pages/PageNotFound";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
