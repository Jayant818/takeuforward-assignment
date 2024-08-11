import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Auth from "./screens/Auth";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);
}

export default App;
