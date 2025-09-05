import Loader from "@/components/Loader";
import { COLORS } from "@/constants/colors";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const Notifications = () => {
  const notifications = useQuery(api.notifications.getNotfications);
  if (notifications === undefined) return <Loader />;
  if (notifications.length === 0) return <NoNotificationsFound />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={(notification) => (
          <NotificationItem notification={notification.item} />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

function NotificationItem({ notification }: { notification: any }) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link href={`/(tabs)/profile`} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
            <View style={styles.iconBadge}>
              {notification.type === "like" && (
                <Ionicons name="heart" size={16} color={COLORS.primary} />
              )}
              {notification.type === "comment" && (
                <Ionicons name="chatbubble" size={16} color={COLORS.primary} />
              )}
              {notification.type === "follow" && (
                <Ionicons name="person-add" size={16} color={COLORS.primary} />
              )}
            </View>
          </TouchableOpacity>
        </Link>
        <View style={styles.notificationInfo}>
          <Link href={`/(tabs)/profile`} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>
                {notification.sender.fullName}
              </Text>
            </TouchableOpacity>
          </Link>

          {notification.type === "like" && (
            <Text style={styles.action}>liked your post</Text>
          )}
          {notification.type === "comment" && (
            <Text style={styles.action}>commented on your post</Text>
          )}
          {notification.type === "follow" && (
            <Text style={styles.action}>started following you</Text>
          )}
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
          {notification.post && (
            <Image
              source={notification.post.imageUrl}
              style={styles.postImage}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
          )}
      </View>
    </View>
  );
}

const NoNotificationsFound = () => {
  return (
    <View style={[styles.container, styles.centered]}>
      <LinearGradient
        colors={COLORS.iconGradient}
        style={{ padding: 20, borderRadius: 30 }}
      >
        <Ionicons
          name="notifications-circle"
          size={100}
          color={COLORS.primary}
        />
      </LinearGradient>
      <Text style={{ color: COLORS.primary, fontSize: 14 }}>
        No notifications yet
      </Text>
    </View>
  );
};

export default Notifications;
