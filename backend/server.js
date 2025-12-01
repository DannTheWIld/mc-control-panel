import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { authenticate, login } from "./auth.js";
import { sendCommand } from "./rcon.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Login route
app.post("/login", login);

// Protected route: execute RCON command
app.post("/command", authenticate, async (req, res) => {
    try {
        const out = await sendCommand(req.body.command);
        res.json({ output: out });
    } catch (e) {
        console.error("RCON Error:", e);
        res.status(500).json({ error: "RCON error: " + (e.message || e) });
    }
});

app.post("/button", authenticate, async (req, res) => {
        res.json({ success: true });
    })

    app.listen(3000, () => console.log("Control panel backend running on port 3000"));

