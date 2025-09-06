import { COLORS } from '@/constants/colors';
import { styles } from '@/styles/feed.style';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

type ChatModal = {
    visible: boolean;
    onClose: () => void;
};

const ChatSearchModal = ({ visible, onClose }: ChatModal) => {
    const [search, setSearch] = useState("");
    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>New Chat</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
                    <TextInput style={[styles.input]} placeholder="Search for a user" value={search} onChangeText={setSearch} />
                    <TouchableOpacity style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: COLORS.surface, paddingHorizontal: 16, paddingVertical: 18, borderRadius: 20}}>
                        <Ionicons name="search" size={16} color={COLORS.white} />
                        <Text style={[styles.postButton, {fontSize: 16}]}>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList data={[] as any[]} renderItem={({item}) => <Text>{item.name}</Text>} keyExtractor={(item) => item.name} />
            </View>
        </Modal>
    )
}

export default ChatSearchModal