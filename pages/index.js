import Head from "next/head";
import Link from "next/link";
import Meta from "../components/Meta";
import Card from "../components/Card";
import GenerateForm from "../components/GenerateForm";
import FooterPromo from "../components/FooterPromo";
import startingPrompts from '../data/starting-prompts.json';

export async function getServerSideProps() {
  const prompt = startingPrompts[Math.floor(Math.random() * startingPrompts.length)];
  return {
    props: { prompt },
  }
}

export default function Home({ prompt }) {
  return (
    <div>
      <div className="container max-w-4xl mx-auto md:px-8 px-4 py-4 pb-10 bg-white border-black min-h-screen">
        <Head>
          <title>AIMUSIC</title>
          <Meta />
        </Head>

        <h1 className="calistoga md:text-8xl text-5xl text-black text-center mb-6 pt-10">
          AIMUSIC
        </h1>

        <p className="text-center mb-10 -mt-2 md:text-2xl text-xl">
          Make music from text then sell it as a <Link href="https://luvnft.com" className="hover:bg-violet-900 underline md:underline-offset-4 hover:no-underline bg-black text-white md:px-2 px-1 md:py-1 rounded">LUV NFT</Link>
        </p>

        <Card>
          <GenerateForm prompt={prompt} />
        </Card>
        <FooterPromo />
      </div>
    </div>
  );
}
