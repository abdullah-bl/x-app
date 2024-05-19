import "server-only"

import Pocketbase from "pocketbase"

const url = process.env.POCKET_BASE_URL || "http://127.0.0.1:8090"
const client = new Pocketbase(url)

client.autoCancellation(false)

export default client
