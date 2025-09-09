import { useEffect, useState } from "react";

interface Profile {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: string;
  desiredJob: string[];
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with real API call
    setTimeout(() => {
      setProfile({
        fullName: "Nguyễn Văn A",
        username: "nguyenvana",
        email: "vana@email.com",
        phone: "0123456789",
        gender: "Nam",
        birthDate: "1995-05-20",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        desiredJob: ["Kỹ sư phần mềm", "Quản lý dự án"],
      });
      setLoading(false);
    }, 500);
  }, []);

  const updateProfile = async (data: Partial<Profile>) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with real API call
      setProfile((prev) => ({ ...prev!, ...data }));
      return true;
    } catch (err: any) {
      setError(err.message || "Cập nhật thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, updateProfile };
}
