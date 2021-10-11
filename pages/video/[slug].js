import { sanityClient, urlFor } from '../../sanity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Comment from '../../components/comment';


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

  const subcount = value => (value === 0 || value > 1 ? 's' : '');

  console.log(title);
  return (
    <div className="video">
      <h3>{title}</h3>
      <div className="video-info">
        <h6>Premiumed on {date}</h6>
        <div className="sentiment">
          <h3>
            <FontAwesomeIcon className="icon" icon={faThumbsUp} />
            {sentimentCount(interaction, 'like')}
          </h3>
          <h3>
            <FontAwesomeIcon className="icon" icon={faThumbsDown} />
            {sentimentCount(interaction, 'dislike')}
          </h3>
        </div>
      </div>
      <div className="author-info">
        <img src={urlFor(author.avatar)} />
        <div>
          <h4>{author.username}</h4>
          <h6>
            {author.followers} Bhakt{subcount(author.followers)}
          </h6>
          <p>{description}</p>
        </div>
      </div>
      <h3>
        {interaction.length} Comment{subcount(interaction.length)}
      </h3>
      <hr />
      {interaction.map((interaction, _id) => (
        <Comment key={_id} interaction={interaction} />
      ))}
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
        followers,
    },
    interaction[]{
        ...,
        commenter->{
            id,
            username,
            slug,
            avatar,
            followers,
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
