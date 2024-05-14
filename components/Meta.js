import { Fragment } from 'react';

const Meta = ({ prompt, video }) => {
  const title = prompt ? prompt : "AImusic";

  return (
    <Fragment>
      <meta property="og:title" content={title} />
      {video && (
        <Fragment>
          <meta property="og:type" content="video" />
          <meta property="og:video:url" content={video} />
          <meta property="og:video:secure_url" content={video} />
          <meta property="og:video:type" content="video/mp4" />
          <meta property="og:video:width" content="1000" />
          <meta property="og:video:height" content="665" />
          <meta property="og:video:tag" content="music" />

          <meta property="twitter:player" content={video} />
          <meta property="twitter:player:width" content="1000" />
          <meta property="twitter:player:height" content="665" />
        </Fragment>
      )}
      <meta property="og:description" content="Text to music using AImusic sold as a LUV NFT" />
      <meta property="og:image" content="https://aimusic.luvnft.com/og.png" />
      <meta property="og:url" content="https://aimusic.luvnft.com" />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://aimusic.luvnft.com" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content="Text to music using AImusic sold as a LUV NFT" />
      <meta property="twitter:image" content="https://aimusic.luvnft.com/og.png" />
    </Fragment>
  );
};

export default Meta;
