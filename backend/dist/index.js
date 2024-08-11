"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/banner", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banner = yield prisma.banner.findFirst();
        res.json(banner);
    }
    catch (error) {
        res.status(500).json({ error: "Unable to fetch banner data" });
    }
}));
app.post("/api/banner", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBanner = yield prisma.banner.upsert({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to update banner data" });
    }
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
