import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (username === "admin" && password === "12345678") {
			navigate("/dashboard");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0">
			<div className="w-full max-w-xs sm:max-w-md p-6 bg-white shadow-lg rounded-lg">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Username
						</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tuf-red"
							placeholder="Enter your username"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tuf-red"
							placeholder="Enter your password"
						/>
					</div>
					{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
					<p className="text-blue-500 text-sm mt-2">
						Username: admin, Password: 12345678
					</p>
					<button
						type="submit"
						className="w-full bg-tuf-red text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Auth;
