import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: "JetBrainsMono-Medium",
        color: COLORS.primary,
    },
    headerTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
    },
    contentDisabled: {
        opacity: 0.7,
    },
    addChatButton:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
        display: "flex",
        padding: 12,
        borderRadius: 10,
        gap: 12,
    },
    addChatButtonText:{
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    addButtonContainer:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom:16,
    },
    shareButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    shareButtonDisabled: {
        opacity: 0.5,
    },
    shareText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    shareTextDisabled: {
        color: COLORS.grey,
    },
    emptyImageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    emptyImageText: {
        color: COLORS.grey,
        fontSize: 16,
    },
    content: {
        flex: 1,
        paddingTop: 16,
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageSection: {
        width: width,
        height: width,
        backgroundColor: COLORS.surface,
        justifyContent: "center",
        alignItems: "center",
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
    changeImageButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
        gap: 6,
    },
    changeImageText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "500",
    },
    inputSection: {
        padding: 16,
        flex: 1,
    },
    captionContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    captionInput: {
        flex: 1,
        color: COLORS.white,
        fontSize: 16,
        paddingTop: 8,
        minHeight: 40,
    },
    chatContainer:{
        paddingHorizontal: 16,
        gap: 16,
        paddingBottom: 32,
    },
    chatItem:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface,
    },
    chatAvatar:{
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.surface,
        marginRight: 12,
    },
    chatContent:{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 4,
    },
    chatUsername:{
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.white,
    },
    chatLastMessage:{
        fontSize: 14,
        fontWeight: "400",
        color: COLORS.grey,
    },
    chatLastMessageTime:{
        fontSize: 12,
        fontWeight: "400",
        color: COLORS.grey,
    }
});
