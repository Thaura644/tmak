/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundPage } from '@payloadcms/next/views'
import config from '@/payload.config'
const NotFound = async (props: any) => NotFoundPage({ config, ...props })
export default NotFound
