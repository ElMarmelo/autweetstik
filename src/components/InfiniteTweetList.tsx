import { isError } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

export default function InfiniteTweetList({
  tweets,
  isError,
  isLoading,
  fetchNewTweets,
  hasMore,
}: InfiniteTweetListProps) {
  if (isLoading)
    return (
      <div className="absolute inline-flex items-center">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-au-gray-100 border-b-transparent " />
      </div>
    );

  if (isError) return <h1>Error</h1>;

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-au-gray-100">
        There&apos;s no tweets right now
      </h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={"loading..."}
      >
        {tweets.map((tweet) => {
          return <div key={tweet.id}>{tweet.content}</div>;
        })}
      </InfiniteScroll>
    </ul>
  );
}
