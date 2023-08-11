import { useSession } from "next-auth/react";
import InfiniteTweetList from "~/components/InfiniteTweetList";
import { useState } from "react";
import NewTweet from "~/components/NewTweet";
import { api } from "~/utils/api";

const Tabs = ["Recientes", "Siguiendo"] as const;

export default function Home() {
  const [selectedTab, setSelectedTab] =
    useState<(typeof Tabs)[number]>("Recientes");
  const session = useSession();
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-au-dark-900">
        <h1 className="mb-2 px-4 py-2 text-3xl font-bold">Inicio</h1>
        {session.status === "authenticated" && (
          <div className="flex">
            {Tabs.map((tab) => {
              return (
                <button
                  className={`flex-grow p-2 hover:bg-au-dark-700 focus-visible:bg-au-dark-700 ${
                    tab === selectedTab
                      ? "border-b-4 border-b-au-primary-500 font-bold"
                      : ""
                  }`}
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}
      </header>
      <NewTweet />
      {selectedTab === "Recientes" ? <RecentTweets /> : <FollowingTweets />}
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

function FollowingTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
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
