import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
	const [bannerData, setBannerData] = useState({
		isVisible: false,
		description: "",
		timer: 0,
		link: "",
		title: "",
		linkTitle: "",
	});

	useEffect(() => {
		const fetchBannerData = async () => {
			try {
				const response = await axios.get(
					"https://backend-1-chi.vercel.app/banner"
				);
				setBannerData(response.data);
			} catch (error) {
				console.error("Error fetching banner data:", error);
			}
		};

		fetchBannerData();
	}, []);

	// @ts-ignore
	const handleChange = (e: any) => {
		const { name, value, type, checked } = e.target;
		setBannerData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			console.log(bannerData);
			await axios.post("http://localhost:5000/api/banner", bannerData);
			alert("Banner updated successfully!");
		} catch (error) {
			console.error("Error updating banner:", error);
			alert("Failed to update banner. Please try again.");
		}
	};

	return (
		<div className="py-10">
			<div className="bg-gray-900 text-white p-6 md:p-8 rounded-lg shadow-lg max-w-lg mx-auto ">
				<h2 className="text-3xl font-bold mb-6 text-center">Dashboard</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="flex items-center">
							<div className="relative">
								<input
									type="checkbox"
									name="isVisible"
									checked={bannerData.isVisible}
									onChange={handleChange}
									className="sr-only"
								/>
								<div className="w-10 h-5 bg-gray-600 rounded-full shadow-inner"></div>
								<div
									className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-0.5 transition ${
										bannerData.isVisible
											? "transform translate-x-6 bg-tuf-red ring-4 ring-tuf-red/80 shadow-lg shadow-tuf-red/50"
											: ""
									}`}
								></div>
							</div>
							<span className="ml-3 text-lg">Banner Visibility</span>
						</label>
					</div>

					<div>
						<label className="block mb-2 text-lg font-semibold">
							Banner Title
						</label>
						<input
							type="text"
							name="title"
							value={bannerData?.title}
							onChange={handleChange}
							className="w-full bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-tuf-red"
						/>
					</div>
					<div>
						<label className="block mb-2 text-lg font-semibold">
							Banner Description
						</label>
						<input
							type="text"
							name="description"
							value={bannerData.description}
							onChange={handleChange}
							className="w-full bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-tuf-red"
						/>
					</div>
					<div>
						<label className="block mb-2 text-lg font-semibold">
							Timer (seconds)
						</label>
						<input
							type="number"
							name="timer"
							value={bannerData.timer}
							onChange={handleChange}
							className="w-full bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-tuf-red"
						/>
					</div>
					<div>
						<label className="block mb-2 text-lg font-semibold">
							Link Title
						</label>
						<input
							type="text"
							name="linkTitle"
							value={bannerData.linkTitle}
							onChange={handleChange}
							className="w-full bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-tuf-red"
						/>
					</div>
					<div>
						<label className="block mb-2 text-lg font-semibold">Link URL</label>
						<input
							type="url"
							name="link"
							value={bannerData.link}
							onChange={handleChange}
							className="w-full bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-tuf-red"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-tuf-red text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
					>
						Update Banner
					</button>
				</form>
			</div>
		</div>
	);
}

export default Dashboard;
