import NewTweet from "~/components/NewTweet";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b">
        <h1 className="mb-2 px-4 text-lg font-bold">Inicio</h1>
        <NewTweet />
      </header>
    </>
  );
}

