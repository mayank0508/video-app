import { sanityClient } from '../sanity';

const Home = ({ videos }) => {
  console.log(videos);
  return <div></div>;
};

export const getServerSideProps = async () => {
  const query = '*[ _type == "video"]';
  const videos = await sanityClient.fetch(query);

  if (!videos.length) {
    return {
      props: {
        videos: []
      }
    };
  } else {
    return {
      props: {
        videos
      }
    };
  }
};

export default Home;
