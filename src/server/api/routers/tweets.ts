import { z } from "zod";
import { prisma } from "../../db";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  infiniteFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
      //Recibir los últimos 10 tweets, ajustable supongo
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      //Usamos findmany, El límite + 1, el cursor usa una conjetura del ID y el creado cuando, los ordena mediante fecha y luego ID
      const currentUserId = ctx.session?.user.id;
      const data = ctx.prisma.tweet.findMany({
        take: limit + 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: { select: { likes: true } },
          likes:
            currentUserId == null
              ? false
              : { where: { userId: currentUserId } },
          user: {
            select: { name: true, id: true, image: true },
          },
        },
      });
      //Conseguir información de los tweets y pedir más, mapeando arreglo por cada entrada individual
      let nextCursor: typeof cursor | undefined;
      if ((await data).length > limit) {
        const nextItem = (await data).pop();
        if (nextItem != null) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
        }
      }
      return {
        tweets: (await data).map((tweet) => {
          return {
            id: tweet.id,
            content: tweet.content,
            createdAt: tweet.createdAt,
            likeCount: tweet._count.likes,
            user: tweet.user,
            likedByMe: tweet.likes?.length > 0,
          };
        }),
        nextCursor,
      };
    }),
  //Crear un tweet, el contenido es un string, mutamos en la base de datos una entrada con ese contenido
  //Agarra el contenido, el ID del usuario además
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const tweet = await ctx.prisma.tweet.create({
        data: { content, userId: ctx.session.user.id },
      });

      return tweet;
    }),
  //Se muta, agarramos el ID del t weet y el del usuario, existing es para ver si ya está con like
  //Buscamos un find unique donde haya datos con el userid en el tweetid, si no hay, se crea la data del like, es un valor booleano, la creamos con sí, si no la cambiamos a no
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { tweetId: id, userId: ctx.session.user.id };

      const existingLike = await ctx.prisma.like.findUnique({
        where: { userId_tweetId: data },
      });

      if (existingLike == null) {
        await ctx.prisma.like.create({ data });
        return { addedLike: true };
      } else {
        await ctx.prisma.like.delete({ where: { userId_tweetId: data } });
        return { addedLike: false };
      }
    }),
});
