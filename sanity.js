import { createClient,createImageUrlBuilder } from 'next-sanity'

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
}
// helpers
export const urlFor = (source) => createImageUrlBuilder(config).image(source); // this helps to conver the image to correct extension
export const sanityClient = createClient(config); // this helps to validate the client configuration