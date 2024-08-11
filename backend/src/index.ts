import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/banner", async (req, res) => {
	try {
		const banner = await prisma.banner.findFirst();
		res.json(banner);
	} catch (error) {
		res.status(500).json({ error: "Unable to fetch banner data" });
	}
});

app.post("/api/banner", async (req, res) => {
	try {
		const updatedBanner = await prisma.banner.upsert({
			where: { id: 1 },
			update: {
				id: 1,
				isVisible: req.body.isVisible,
				description: req.body.description,
				timer: Number(req.body.timer),
				link: req.body.link,
				linkTitle: req.body.linkTitle,
				title: req.body.title,
			},
			create: {
				id: 1,
				isVisible: req.body.isVisible,
				description: req.body.description,
				timer: Number(req.body.timer),
				link: req.body.link,
				title: req.body.title,
				linkTitle: req.body.linkTitle,
			},
		});
		res.json(updatedBanner);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Unable to update banner data" });
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
