import { Briefcase, Mail, MapPin, Phone, User, Venus } from "lucide-react";
import React from "react";
import { Avatar, Box, Button, Page, Text, useNavigate } from "zmp-ui";
import { useProfile } from "../../hooks/useProfile";

// Example profile data (replace with real data or props/context)
const profileData = {
    fullName: "Nguyễn Văn A",
    username: "nguyenvana",
    email: "vana@email.com",
    phone: "0123456789",
    gender: "Nam",
    birthDate: "1995-05-20",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    desiredJob: ["Kỹ sư phần mềm", "Quản lý dự án"],
};

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { profile = profileData, loading, error } = useProfile();
    if (loading) return <Page className="flex items-center justify-center min-h-screen"><Text>Đang tải hồ sơ...</Text></Page>;
    if (error) return <Page className="flex items-center justify-center min-h-screen"><Text className="text-red-500">{error}</Text></Page>;
    if (!profile) return null;
    return (
        <Page className="bg-gray-100 min-h-screen p-4 flex flex-col items-center" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
            <Box className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center mt-8">
                <Avatar size={80} className="mb-4">
                    <User size={40} />
                </Avatar>
                <Text.Header className="text-2xl font-bold text-blue-800 mb-1">{profile.fullName}</Text.Header>
                <Text className="text-gray-500 mb-4">@{profile.username}</Text>
                <Box className="w-full space-y-3 mb-6">
                    <Box className="flex items-center gap-2">
                        <Mail size={18} className="text-blue-500" />
                        <Text>{profile.email}</Text>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <Phone size={18} className="text-blue-500" />
                        <Text>{profile.phone}</Text>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <Venus size={18} className="text-blue-500" />
                        <Text>{profile.gender}</Text>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <User size={18} className="text-blue-500" />
                        <Text>{new Date(profile.birthDate).toLocaleDateString()}</Text>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <MapPin size={18} className="text-blue-500" />
                        <Text>{profile.address}</Text>
                    </Box>
                    <Box className="flex items-center gap-2">
                        <Briefcase size={18} className="text-blue-500" />
                        <Text>Ngành nghề mong muốn: {profile.desiredJob.join(", ")}</Text>
                    </Box>
                </Box>
                <Button className="btn-primary w-full mb-2">Chỉnh sửa hồ sơ</Button>
                <Button className="btn-blue w-full" variant="secondary" onClick={() => navigate("/login")}>Đăng xuất</Button>
            </Box>
        </Page>
    );
};

export default ProfilePage;
