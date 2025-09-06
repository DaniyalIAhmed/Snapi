import ChatSearchModal from "@/components/ChatSearchModal";
import { COLORS } from "@/constants/colors";
import { generateChatData } from "@/seeds/chat";
import { styles } from "@/styles/chat.style";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type ChatProps ={
  _id: string;
  userName: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
}
const Chats = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <View
            style={{
              padding: 5,
              borderRadius: 10,
              backgroundColor: COLORS.iconBackground,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Chats</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addChatButton} onPress={() => setIsSearchModalVisible(true)}>
            <Ionicons name="add" size={24} color={COLORS.primary} />
            <Text style={styles.addChatButtonText}>Start a new Chat</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={generateChatData(10) as ChatProps[]}
          renderItem={({ item }) => <ChatItem chat={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContainer}
        />
      </View>
      <ChatSearchModal visible={isSearchModalVisible} onClose={() => setIsSearchModalVisible(false)} />
    </View>
  );
};

export default Chats;

const ChatItem = ({ chat }: { chat: ChatProps }) => {
  return (
    <TouchableOpacity style={styles.chatItem}>
      <Image source={{uri: chat.avatar}} style={styles.chatAvatar} />
      <View style={styles.chatContent}>
        <Text style={styles.chatUsername}>{chat.userName}</Text>
        <Text style={styles.chatLastMessage}>{chat.lastMessage.length > 20 ? chat.lastMessage.substring(0, 20) + "..." : chat.lastMessage}</Text>
        <Text style={styles.chatLastMessageTime}>{formatDistanceToNow(chat.lastMessageTime, { addSuffix: true })}</Text>
      </View>
    </TouchableOpacity>
  );
};
