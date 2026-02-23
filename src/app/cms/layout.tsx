import config from '@/payload.config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

type Args = { children: React.ReactNode }

async function serverFunction(args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap: {},
  })
}

const CMSLayout = ({ children }: Args) => {
  return (
    <RootLayout 
      config={config}
      importMap={{}}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}

export default CMSLayout
