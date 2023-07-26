import InfiniteTweetList from "~/components/InfiniteTweetList";
import NewTweet from "~/components/NewTweet";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b">
        <h1 className="px-4 py-2 mb-2 text-3xl font-bold">Inicio</h1>
        <NewTweet />
      </header>
      <RecentTweets />
    </>
  );
}

function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      hasMore={tweets.hasNextPage}
      isLoading={tweets.isLoading}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}
