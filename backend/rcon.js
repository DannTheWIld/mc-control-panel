import RconFromPackage from 'rcon-srcds';

// Handle the import compatibility: use .default if it exists (ESM), otherwise use the package directly (CJS)
const Rcon = RconFromPackage.default || RconFromPackage;

import config from "./config.json" with { type: "json" };

export async function sendCommand(command) {
    const rcon = new Rcon({
        host: config.rcon.host,
        port: config.rcon.port,
        password: config.rcon.password,
    });

    await rcon.connect();
    await rcon.authenticate(config.rcon.password);
    const response = await rcon.execute(command);
    await rcon.disconnect();
    return response;
}
