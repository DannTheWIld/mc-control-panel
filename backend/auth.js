import crypto from "crypto";
import config from "./config.json" with { type: "json" };

const hash = (str) => crypto.createHash("sha256").update(str).digest("hex");
const passwordHash = hash(config.panelPassword);

export function authenticate(req, res, next) {
    const token = req.headers["x-auth-token"];
    if (!token) return res.status(401).json({ error: "Missing token" });
    if (token !== passwordHash) return res.status(403).json({ error: "Invalid token" });
    next();
}

export function login(req, res) {
    const { password } = req.body;
    if (hash(password) === passwordHash) {
        return res.json({ token: passwordHash });
    }
    res.status(403).json({ error: "Incorrect password" });
}
