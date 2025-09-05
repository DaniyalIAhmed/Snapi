import Loader from "@/components/Loader";
import { COLORS } from "@/constants/colors";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.style";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type PostProps = {
  post: {
    author: {
      imageUrl: string | undefined;
      fullName: string | undefined;
    };
    _id: Id<"posts">;
    _creationTime: number;
    caption?: string | undefined;
    comments: number;
    userId: Id<"users">;
    imageUrl: string;
    storageId: Id<"_storage">;
    likes: number;
  }
}

const Bookmarks = () => {
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);
  if (bookmarkedPosts === undefined) return <Loader />;
  if (bookmarkedPosts.length === 0) return <NoBookmarksFound />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        {bookmarkedPosts.map((post) => (
          <Post key={post!._id} post={post!} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Bookmarks;

function NoBookmarksFound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        gap: 30,
      }}
    >
      <LinearGradient
        colors={COLORS.iconGradient}
        style={{ padding: 20, borderRadius: 30 }}
      >
        <Ionicons name="bookmark" size={100} color={COLORS.primary} />
      </LinearGradient>
      <Text style={{ color: COLORS.primary, fontSize: 14 }}>
        No bookmarked posts yet
      </Text>
    </View>
  );
}

function Post({ post }: PostProps) {
  if (post === undefined) return;
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Link href={"/(tabs)/notifications"}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author.imageUrl}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
            <Text style={{color: COLORS.white, fontSize: 14, fontWeight: "600"}}>{post.author.fullName}</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={post?.imageUrl}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy={"memory-disk"}
      />
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity onPress={() => { }} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
            <Ionicons
              name={"heart"}
              size={24}
              color={COLORS.white}
            />
            <Text style={{color: COLORS.white, fontSize: 16, fontWeight: "600"}}>{post.likes > 0 ?post.likes:0}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }} style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
            <Ionicons
              name="chatbubble"
              size={24}
              color={COLORS.white}
            />
            <Text style={{color: COLORS.white, fontSize: 16, fontWeight: "600"}}>{post.comments > 0 ?post.comments:0}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.postInfo,{backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical:8, borderRadius: 15,marginHorizontal:12}]}>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{post.author.fullName}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}
        <Text style={styles.timeAgo}>
          {formatDistanceToNow(post._creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View>
  );
}