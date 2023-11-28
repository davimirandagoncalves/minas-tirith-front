declare var process: Process;

interface Env {
    API_KEY: string,
    AUTH_DOMAIN: string,
    PROJECT_ID: string,
    STORAGE_BUCKET: string,
    MESSAGING_SENDER_ID: string,
    APP_ID: string,
    MEASUREMENT_ID: string
}

interface Process {
    env: Env
}
