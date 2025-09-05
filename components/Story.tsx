import { styles } from "@/styles/feed.style";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type StoryProps = {
  id: number;
  userName: string;
  avatar: string;
  hasStory: boolean;
};
const Story = ({ story }: { story: StoryProps }) => {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image source={{ uri: story.avatar }} style={styles.noStory} />
      </View>
      <Text style={styles.storyUsername}>{story.userName}</Text>
    </TouchableOpacity>
  );
};

export default Story;
