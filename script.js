// =======================
// Real Time Clock
// =======================

function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleDateString() +
        " | " +
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// =======================
// Theme Toggle
// =======================

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const light = document.body.classList.contains("light-mode");

    localStorage.setItem(
        "theme",
        light ? "light" : "dark"
    );

    themeToggle.textContent =
        light ? "☀️" : "🌙";
});

// =======================
// Metric Update
// =======================

function getStatus(value) {
    if (value < 60) {
        return {
            text: "Healthy",
            color: "#22c55e"
        };
    }

    if (value < 85) {
        return {
            text: "Warning",
            color: "#facc15"
        };
    }

    return {
        text: "Critical",
        color: "#ef4444"
    };
}

function updateMetric(name) {

    const value =
        Math.floor(Math.random() * 100);

    const status =
        getStatus(value);

    document.getElementById(
        `${name}Value`
    ).textContent = `${value}%`;

    const bar =
        document.getElementById(
            `${name}Bar`
        );

    bar.style.width = `${value}%`;
    bar.style.background = status.color;

    const statusElement =
        document.getElementById(
            `${name}Status`
        );

    statusElement.textContent =
        status.text;

    statusElement.style.background =
        status.color;
}

function updateAllMetrics() {

    updateMetric("cpu");
    updateMetric("ram");
    updateMetric("disk");
    updateMetric("network");

    updateStats();
}

updateAllMetrics();

setInterval(() => {
    updateAllMetrics();
    addLog();
}, 5000);

// =======================
// Statistics
// =======================

function updateStats() {

    document.getElementById("uptime")
        .textContent =
        (99 + Math.random()).toFixed(2) + "%";

    document.getElementById("users")
        .textContent =
        Math.floor(
            Math.random() * 5000
        );

    document.getElementById("rps")
        .textContent =
        Math.floor(
            Math.random() * 1000
        );

    document.getElementById("response")
        .textContent =
        Math.floor(
            Math.random() * 150
        ) + "ms";
}

// =======================
// Activity Logs
// =======================

const logContainer =
    document.getElementById(
        "logContainer"
    );

const logMessages = [
    "CPU metrics updated",
    "Health check completed",
    "Database ping successful",
    "API latency monitored",
    "Memory allocation refreshed",
    "Disk scan completed",
    "Network traffic analyzed",
    "Cache cleared successfully"
];

function addLog() {

    const now =
        new Date()
        .toLocaleTimeString();

    const msg =
        logMessages[
            Math.floor(
                Math.random() *
                logMessages.length
            )
        ];

    const li =
        document.createElement("li");

    li.textContent =
        `[${now}] ${msg}`;

    logContainer.prepend(li);

    while (
        logContainer.children.length > 10
    ) {
        logContainer.removeChild(
            logContainer.lastChild
        );
    }
}

for (let i = 0; i < 5; i++) {
    addLog();
}