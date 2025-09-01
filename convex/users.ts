import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    userName: v.string(),
    fullName: v.string(),
    email: v.string(),
    image: v.string(),
    clerkId: v.string(),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (user) {
      return;
    }
    const newTaskId = await ctx.db.insert("users", {
      userName: args.userName,
      fullName: args.fullName,
      email: args.email,
      image: args.image,
      clerkId: args.clerkId,
      bio: args.bio,
      followers: 0,
      following: 0,
      posts: 0,
    });
    return newTaskId;
  },
});
