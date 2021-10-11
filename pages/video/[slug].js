import { sanityClient } from '../../sanity';

const Video = ({
  title,
  asset,
  thumbnail,
  date,
  description,
  author,
  interaction
}) => {
  const sentimentCount = (interaction, sentiment) => {
    return interaction.filter(interaction => interaction.sentiment == sentiment)
      .length;
  };

  console.log(title);
  return (
    <div className="video">
      <h3>{title}</h3>
      <div className="video-info">
        <h6>Premiumed on {date}</h6>
        <div>
          <h3>{sentimentCount(interaction, 'like')}</h3>
          <h3>{sentimentCount(interaction, 'dislike')}</h3>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async pageContext => {
  const pageSlug = pageContext.query.slug;
  const query = `*[ _type == "video" && slug.current == $pageSlug ][0]{
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
    interaction[]{
        ...,
        commenter->{
            id,
            username,
            slug,
            avatar,
            subscribers,
            }
         }
     }`;

  const video = await sanityClient.fetch(query, { pageSlug });

  if (!video) {
    return {
      props: null,
      notFound: true
    };
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
        interaction: video.interaction
      }
    };
  }
};

export default Video;
