import {
    GRAPHQL_PLAYGROUND_GET,
    GRAPHQL_POST,
    REST_DELETE,
    REST_GET,
    REST_OPTIONS,
    REST_PATCH,
    REST_POST,
    REST_PUT,
} from '@payloadcms/next/routes'
import config from '@/payload.config'

export const GET = (req: Request, args: any) => {
    if (req.url.includes('/api/graphql')) {
        return GRAPHQL_PLAYGROUND_GET(config)(req, args)
    }
    return REST_GET(config)(req, args)
}

export const POST = (req: Request, args: any) => {
    if (req.url.includes('/api/graphql')) {
        return GRAPHQL_POST(config)(req, args)
    }
    return REST_POST(config)(req, args)
}

export const PATCH = REST_PATCH(config)
export const DELETE = REST_DELETE(config)
export const OPTIONS = REST_OPTIONS(config)
export const PUT = REST_PUT(config)
