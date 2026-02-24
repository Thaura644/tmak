import { getPayload } from 'payload'
import config from './src/payload.config'

async function init() {
    try {
        console.log('Initializing Payload...')
        const payload = await getPayload({ config })
        console.log('Payload initialized successfully.')
        process.exit(0)
    } catch (error) {
        console.error('Failed to initialize Payload:', error)
        process.exit(1)
    }
}

init()
