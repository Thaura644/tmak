/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@/payload.config'
export { generatePageMetadata as generateMetadata }
const Page = async (props: any) => RootPage({ config, ...props })
export default Page
