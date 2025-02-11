import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import "./styles/main.scss";
import UpdateContact from "./pages/UpdateContact";
import { ContactsContextProvider } from "./context/ContactsContext";
import CreateContact from "./pages/CreateContact";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <ContactsContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateContact />} />
            <Route path="/update/:contactId" element={<UpdateContact />} />
          </Routes>
        </Layout>
      </ContactsContextProvider>
    </BrowserRouter>
    </>
    
  );
};

export default App;
