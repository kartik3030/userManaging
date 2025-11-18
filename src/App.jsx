// App.jsx
import { Routes, Route, Link } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import CreateUser from "./Pages/CreateUser.jsx"
import EditUser from "./Pages/EditUser.jsx"
import DetailedPage from "./Pages/DetailedPage.jsx"

function App() {
  return (
    <>
      {/* navbar routes */}
      <nav className="p-4 bg-gray-100 flex justify-between">
        <Link to="/" className="font-bold text-xl">User Manager</Link>
        <Link to="/create" className="text-blue-600">Create User</Link>
      </nav>

      {/* other routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/user/:id" element={<DetailedPage />} />
      </Routes>
    </>
  )
}

export default App