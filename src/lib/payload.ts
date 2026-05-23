import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

export const getPayload = cache(async () => {
  return getPayloadInstance({ config })
})
