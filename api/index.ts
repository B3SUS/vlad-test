import { NestFactory } from "@nestjs/core"
import { AppModule } from "../src/app.module"
import { ExpressAdapter } from "@nestjs/platform-express"
// Fix the import statement
import express = require('express'); // This syntax works better with TypeScript

// Create Express instance
const server = express() // Now this should work

// This is the serverless function entry point
async function bootstrap() {
    try {
        const app = await NestFactory.create(
            AppModule,
            new ExpressAdapter(server)
        )

        // Enable CORS
        app.enableCors()

        // Initialize the Nest application
        await app.init()

        console.log('NestJS application initialized successfully')
        return app
    } catch (error) {
        console.error('Failed to initialize NestJS application:', error)
        throw error
    }
}

// Initialize the server
let isBootstrapped = false

export default async function handler(req, res) {
    try {
        // Bootstrap the app only once
        if (!isBootstrapped) {
            await bootstrap()
            isBootstrapped = true
        }

        // Forward the request to Express
        return server(req, res)
    } catch (error) {
        console.error('Error handling request:', error)
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message || 'The server encountered an unexpected condition'
        })
    }
}
