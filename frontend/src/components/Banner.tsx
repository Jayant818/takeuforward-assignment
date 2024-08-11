import { useState, useEffect } from "react";
import axios from "axios";

function Banner() {
	const [bannerData, setBannerData] = useState<{
		isVisible: boolean;
		description?: string;
		timer: number;
		link?: string;
		title?: string;
		linkTitle?: string;
	}>({
		isVisible: false,
		description: "",
		timer: 0,
		link: "",
		title: "",
		linkTitle: "",
	});
	const [timeLeft, setTimeLeft] = useState(0);

	useEffect(() => {
		const fetchBannerData = async () => {
			try {
				const response = await axios.get(
					"https://backend-lake-eight.vercel.app/banner"
				);
				console.log(response);
				setBannerData(response.data);
				setTimeLeft(response.data.timer);
			} catch (error) {
				console.error("Error fetching banner data:", error);
			}
		};

		fetchBannerData();
	}, []);

	useEffect(() => {
		if (timeLeft > 0) {
			const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timerId);
		}
	}, [timeLeft]);

	// Helper function to format the time left
	const formatTimeLeft = (seconds: number) => {
		const days = Math.floor(seconds / (24 * 3600));
		seconds %= 24 * 3600;
		const hours = Math.floor(seconds / 3600);
		seconds %= 3600;
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
	};

	if (!bannerData || !bannerData.isVisible || timeLeft <= 0) {
		return null;
	}

	return (
		<div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-8">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
				<div className="flex flex-col sm:flex-row items-start sm:items-center">
					<div className="bg-white rounded-lg p-2 mb-4 sm:mb-0 sm:mr-4">
						<span className="text-tuf-red font-bold">TUF+</span>
					</div>
					<div className="text-center sm:text-left">
						<h2 className="text-xl sm:text-2xl font-bold mb-2">
							{bannerData.title}
						</h2>
						<h2 className="text-base font-bold mb-2">
							{bannerData.description}
						</h2>
						<p className="text-gray-400">
							Time remaining: {formatTimeLeft(timeLeft)}
						</p>
					</div>
				</div>
				<a
					href={bannerData.link}
					target="_blank"
					rel="noopener noreferrer"
					className="bg-tuf-red text-white px-4 py-2 mt-4 sm:mt-0 sm:px-6 sm:py-2 rounded-lg hover:bg-red-700 transition-colors"
				>
					{bannerData.linkTitle}
				</a>
			</div>
		</div>
	);
}

export default Banner;
