let token = null;

async function login() {
    const password = document.getElementById("password").value;
    const r = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    });

    const data = await r.json();
    if (data.token) {
        token = data.token;
        document.getElementById("login").style.display = "none";
        document.getElementById("run command").style.display = "block";
        document.getElementById("pages").style.display = "block";
    } else {
        alert("Incorrect password");
    }
}

async function runCmd() {
    const cmd = document.getElementById("cmd").value;
    sendCmd(cmd);
}

async function sendCmd(cmd) {
    const r = await fetch("http://localhost:3000/command", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify({command: cmd})
    });

    const data = await r.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

async function managePlayersPage()  {
    const r = await fetch("http://localhost:3000/button", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    });

    if (r.ok) {
        document.getElementById("MPP").style.display = "block";
    }
}

