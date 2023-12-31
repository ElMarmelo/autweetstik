import { Mutation, isError } from "@tanstack/react-query";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "./ProfileImage";
import { useSession } from "next-auth/react";
import { boolean } from "zod";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import IconHoverEffect from "./IconHoverEffect";
import { api } from "~/utils/api";
import LoadingSpinner from "./ui/LoadingSpinner";

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
  hasMore: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

//Renderizar componente, definir si carga, si hay un error o cualquier otra picha
export default function InfiniteTweetList({
  tweets,
  isError,
  isLoading,
  fetchNewTweets,
  hasMore = false,
}: InfiniteTweetListProps) {
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <h1>Error</h1>;

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-au-gray-100">
        Ahorita mismo no hay tweets
      </h2>
    );
  }

  //Scroll infinito con la vara y las posibilidades, en caso de que se necesiten más, se piden más tweets
  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
      >
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet} />;
        })}
      </InfiniteScroll>
    </ul>
  );
}

//Formatear fecha
const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

function TweetCard({
  id,
  user,
  content,
  createdAt,
  likeCount,
  likedByMe,
}: Tweet) {
  //Lógica de los likes, contexto, mutar y en éxito se actualiza el dato del tweet, se agrega un 1, y se actualiza el feed
  const trpcUtils = api.useContext();
  const toggleLike = api.tweet.toggleLike.useMutation({
    onSuccess: ({ addedLike }) => {
      const updateData: Parameters<
        typeof trpcUtils.tweet.infiniteFeed.setInfiniteData
      >[1] = (oldData) => {
        if (oldData == null) return;

        const countModifier = addedLike ? 1 : -1;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              tweets: page.tweets.map((tweet) => {
                if (tweet.id === id) {
                  return {
                    ...tweet,
                    likeCount: tweet.likeCount + countModifier,
                    likedByMe: addedLike,
                  };
                }

                return tweet;
              }),
            };
          }),
        };
      };
      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, updateData);
      trpcUtils.tweet.infiniteProfileFeed.setInfiniteData(
        { userId: user.id },
        updateData
      );
    },
  });

  function handleToggleLike() {
    //Mutamos el tweet mediante su ID
    toggleLike.mutate({ id });
  }
  return (
    <li className="flex gap-4 border-b p-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1 font-bold hover:underline focus-visible:underline">
          <Link href={`/profiles/${user.id}`}>{user.name}</Link>
          <span className="">-</span>
          <span className="">{dateTimeFormatter.format(createdAt)}</span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <LikeButton
          onClick={handleToggleLike}
          isLoading={toggleLike.isLoading}
          likedByMe={likedByMe}
          likeCount={likeCount}
        />
      </div>
    </li>
  );
}

type HeartButtonProps = {
  isLoading: boolean;
  onClick: () => void;
  likedByMe: boolean;
  likeCount: number;
};

function LikeButton({
  likedByMe,
  onClick,
  isLoading,
  likeCount,
}: HeartButtonProps) {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;
  if (session.status !== "unauthenticated") {
    return (
      // <div className="flex items-center self-start gap-3 my-1">
      //   <HeartIcon />
      //   <span>{likeCount}</span>
      // </div>
      <button
        disabled={isLoading}
        onClick={onClick}
        className={`duraiton-200 group -ml-2 flex items-center gap-1 self-start transition-colors ${
          likedByMe ? "text-au-primary-100" : "text-au-gray-300"
        }hover:text-au-primary-300 focus-visible:text-au-primary-300`}
      >
        <IconHoverEffect pink>
          <HeartIcon
            className={`transition-colors duration-200 ${
              likedByMe
                ? "fill-au-primary-100"
                : "fill-au-gray-500 group-hover:fill-au-primary-300 group-focus-visible:fill-au-primary-100"
            }`}
          />
        </IconHoverEffect>
        <span>{likeCount}</span>
      </button>
    );
  }
}
