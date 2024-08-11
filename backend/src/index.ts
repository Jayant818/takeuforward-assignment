import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Welcome to TUF API" });
});

app.get("/banner", async (req, res) => {
	try {
		const banner = await prisma.banner.findFirst();
		res.json(banner);
	} catch (error) {
		res.status(500).json({ error: "Unable to fetch banner data" });
	}
});

app.post("/banner", async (req, res) => {
	try {
		const updatedBanner = await prisma.banner.upsert({
			where: { id: 1 },
			update: {
				id: 1,
				isVisible: true,
				description: "12345",
				timer: 3600,
				link: "https:google.com",
				title: "Hello",
				linkTitle: "Explore TUF",
			},
			create: {
				id: 1,
				isVisible: true,
				description: "12345",
				timer: 3600,
				link: "https:google.com",
				title: "Hello",
				linkTitle: "Explore TUF",
			},
		});
		res.json(updatedBanner);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Unable to update banner data" });
	}
});

const PORT = 3000;

if (require.main === module) {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
