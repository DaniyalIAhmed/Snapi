import Loader from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { COLORS } from "@/constants/colors";
import { api } from "@/convex/_generated/api";
import { generateStoryData } from "@/seeds/story";
import { styles } from "@/styles/feed.style";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { signOut } = useAuth();
  const feedPosts = useQuery(api.posts.getFeedPosts);
  if (feedPosts === undefined) return <Loader />;
  if (feedPosts.length === 0) return <NoPostsFound />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>snapi</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={feedPosts}
        renderItem={(post) => <Post post={post.item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={<StoriesSection/>}
      />
    </View>
  );
}

const StoriesSection = () => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.storiesContainer}
  >
    {generateStoryData(10).map((st, index) => (
      <Story key={index} story={st} />
    ))}
  </ScrollView>
);

const NoPostsFound = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 20, color: COLORS.primary }}>No posts yet</Text>
  </View>
);
