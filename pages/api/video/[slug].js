import { sanityClient } from "../../../sanity";


const Video = () => {
return (
    <>
    </>
)
}



const getServerSideProps = async () => {
    const query = `*[ _type == "video" && slug.current == $pageSlug ][0]{'
    title,
    id,
    'asset': videoAsset.asset->,
    thumbnail,
    date,
    description,
    author->{
        id,
        username,
        slug,
        avatar,
        subscribers,
    },
    interactions[]{
        ...,
        commenter->{
            id,
            username,
            slug,
            avatar,
            subscribers,
            }
         }
    '}`
}

export const Video;