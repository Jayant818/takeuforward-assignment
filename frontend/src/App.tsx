import { CiShare1 } from "react-icons/ci";
import Banner from "./components/Banner";

function App() {
	return (
		<div className="min-h-screen bg-tuf-dark relative">
			<header className="bg-black p-4 flex flex-col sm:flex-row justify-between items-center">
				<h1 className="text-tuf-red text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
					TUF
				</h1>
				<a
					href="https://takeuforward-assignment-mien.vercel.app/"
					target="_blank"
					className="bg-tuf-red flex items-center gap-1 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
				>
					Go To DashBoard <CiShare1 />
				</a>
			</header>
			<main className="container mx-auto px-4 py-8 text-center sm:text-left">
				<h1 className="text-3xl sm:text-4xl font-bold mb-4">
					Gear Up for <span className="text-tuf-red">Success</span>: Your
					Ultimate Preparation Hub!
				</h1>
				<p className="text-gray-400 mb-8">
					Navigate Your Learning Adventure: Explore DSA, Master CS Concepts,
					Design Systems, Hone Competitive Skills, and Ace Interviews
					Effortlessly
				</p>
				<Banner />
			</main>
		</div>
	);
}

export default App;
