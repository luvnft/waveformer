import Head from "next/head";
import Meta from "../../components/Meta";
import Link from 'next/link';
import Card from '../../components/Card';
import FooterPromo from "../../components/FooterPromo";
import VideoContainer from '../../components/VideoContainer';
import GenerateForm from '../../components/GenerateForm';

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`${process.env.PUBLIC_URL}/api/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!res.ok) {
    return {
      notFound: true,
    }
  }

  const prediction = await res.json();
  const duration = parseInt(prediction?.logs?.match(/Duration: 00:00:(\d+).00/)?.[1] ?? 8);
  return {
    props: {
      prompt: prediction.input.caption_text,
      video: prediction.output,
      audio: prediction.input.audio,
      duration,
      prediction
    },
  }
}

export default function Music({ prompt, video, audio, duration, prediction }) {
  const title = `${prompt} – Waveformer`;
  console.log(prediction)

  return (
    <div>
      <div className="container max-w-4xl mx-auto md:px-8 px-4 py-4 pb-10 bg-white border-black min-h-screen">
        <Head>
          <title>{title}</title>
          <Meta prompt={prompt} video={video} />
        </Head>

        <h1 className="calistoga md:text-6xl text-4xl text-black text-center mb-6 pt-10">
          <Link href="/">AImusic</Link>
        </h1>

        <p className="text-center md:mb-10 mb-6 -mt-2 md:text-2xl">
        Make music from text then sell it as a <Link href="https://luvnft.com" className="hover:bg-violet-900 underline md:underline-offset-4 hover:no-underline bg-black text-white md:px-2 px-1 md:py-1 rounded">LUV NFT</Link> .
        </p>

        <Card>
          <VideoContainer video={video} audio={audio} />
        </Card>

        <Card>
          <GenerateForm prompt={prompt} duration={duration} isMusicPage={true} />
        </Card>
        <FooterPromo />
      </div>
    </div>
  );
}
