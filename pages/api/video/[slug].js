import { sanityClient } from "../../../sanity";


const Video = ({
    title,
    asset,
    thumbnail,
    date,
    description,
    author,
    interactions
}) => {

    console.log(title);
return (
    <>
    </>
)
}



export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug
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

   const video = await sanityClient.fetch(query, { pageSlug })

   if(!video) {
       return {
           props: null,
           notFound: true
       }
} else {
    return {
        props: {
            title: video.title,
            id: video.id,
            video: video.asset,
            thumbnail: video.thumbnail,
            date: video.date,
            description: video.description,
            author: video.author,
            interactions: video.interactions,
        }
    }
}
}

export const Video;