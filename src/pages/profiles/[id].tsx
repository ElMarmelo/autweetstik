import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import ErrorPage from "next/error";
import Link from "next/link";
import IconHoverEffect from "~/components/IconHoverEffect";
import { RiArrowLeftSLine } from "react-icons/ri";
import { ProfileImage } from "~/components/ProfileImage";
import InfiniteTweetList from "~/components/InfiniteTweetList";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
type Profile = {
  name: string;
  image: string;
  followersCount: number;
  followsCount: number;
  tweetsCount: number;
  isFollowing: boolean;
};

type FollowButtonProps = {
  userId: string;
  isFollowing: boolean;
  onClick: () => void;
  isLoading: boolean;
};

const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { data: profile } = api.profile.getById.useQuery<Profile>({ id });
  const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery(
    { userId: id },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  const profileInfo = {
    name: profile?.name ?? "",
    image: profile?.image ?? "",
    tweetsCount: profile?.tweetsCount ?? 0,
    followersCount: profile?.followersCount ?? 0,
    followsCount: profile?.followsCount ?? 0,
    isFollowing: profile?.isFollowing ?? false,
  };
  const trpcUtils = api.useContext();
  const toggleFollow = api.profile.toggleFollow.useMutation({
    onSuccess: ({ addedFollow }) => {
      trpcUtils.profile.getById.setData({ id }, (oldData) => {
        if (oldData == null) return;

        const countModifier = addedFollow ? 1 : -1;
        return {
          ...oldData,
          isFollowing: addedFollow,
          followersCount: oldData.followersCount + countModifier,
        };
      });
    },
  });
  if (profile === null || profileInfo.name == null)
    return <ErrorPage statusCode={404} />;

  return (
    <>
      <Head>
        <title>{`Autweetstik | ${profileInfo.name}`}</title>
        <meta name="description" content="Twitter but barely works lmao" />
      </Head>
      <>
        <header className="sticky top-0 z-10 flex border-collapse items-center bg-au-dark-900 px-4 py-2">
          <Link href={".."} className="mr-2">
            <IconHoverEffect>
              <RiArrowLeftSLine className="h-6 w-6 hover:text-au-dark-900" />
            </IconHoverEffect>
          </Link>
          <ProfileImage
            src={profileInfo.image}
            className="flex-shrink-0 rounded-full"
          />
          <div className="ml-2 flex-grow">
            <h1 className=" tex-lg ml-2 font-bold">{profileInfo.name}</h1>
            <div className="text-au-gray-300">
              {profileInfo.tweetsCount}{" "}
              {getPlural(profileInfo.tweetsCount, "Autistweet", "Autistweets")}{" "}
              | {profileInfo.followersCount}{" "}
              {getPlural(profileInfo.followersCount, "Seguidor", "Seguidores")}{" "}
              | {profileInfo.followsCount} Siguiendo
            </div>
          </div>
          <FollowButton
            isFollowing={profileInfo.isFollowing}
            isLoading={toggleFollow.isLoading}
            userId={id}
            onClick={() => toggleFollow.mutate({ userId: id })}
          />
        </header>
        <main>
          <InfiniteTweetList
            tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
            isError={tweets.isError}
            hasMore={tweets.hasNextPage}
            isLoading={tweets.isLoading}
            fetchNewTweets={tweets.fetchNextPage}
          />
        </main>
      </>
    </>
  );
};

function FollowButton({
  userId,
  isFollowing,
  onClick,
  isLoading,
}: FollowButtonProps): JSX.Element {
  const session = useSession();

  if (session.status !== "authenticated" || session.data.user.id === userId) {
    return <></>;
  }
  return (
    <Button
      variant={isFollowing ? "ghostSecondary" : "secondary"}
      disabled={isLoading}
      onClick={onClick}
    >
      {isFollowing ? "Siguiendo" : "Seguir"}
    </Button>
  );
}
const pluralRules = new Intl.PluralRules("es");
function getPlural(number: number, singular: string, plural: string) {
  return pluralRules.select(number) === "one" ? singular : plural;
}
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context.params?.id;
  if (id == null) {
    return { redirect: { destination: "/" } };
  }
  const ssg = ssgHelper();
  await ssg.profile.getById.prefetch({ id });
  return {
    props: {
      trppcState: ssg.dehydrate(),
      id,
    },
  };
}

export default ProfilePage;
