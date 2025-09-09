import {
  Briefcase,
  Building,
  Calendar,
  GraduationCap,
  IdCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
  Venus
} from "lucide-react";
import React from "react";
import {
  Box,
  Button,
  DatePicker,
  Input,
  Page,
  Text,
  useNavigate
} from "zmp-ui";

import MultiSelect from "../../components/MultiSelect";
import {
  cmktLevelOptions,
  desiredJobList,
  educationLevelOptions,
  ethnicityOptions,
  genderOptions,
} from "../../data/formOptions";


import InputBox from "../../components/InputBox";
import SingleSelect from "../../components/SingleSelect";
import { useRegisterForm } from "../../hooks/useRegisterForm";

const { Password } = Input;

const LoginInfoSection: React.FC<{
  formData: any;
  touched: any;
  handleInputChange: any;
  handleInputBlur: any;
}> = ({ formData, touched, handleInputChange, handleInputBlur }) => (
  <Box className="space-y-4">
    <Text className="text-lg font-semibold text-gray-700">
      Thông tin đăng nhập
    </Text>
    <InputBox
      label="Tên đăng nhập"
      icon={<User size={18} />}
      error={touched.username && !formData.username}
      errorMessage={touched.username && !formData.username ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Tên đăng nhập"
        value={formData.username}
        onChange={handleInputChange("username")}
        onBlur={handleInputBlur("username")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
    <InputBox
      label="Mật khẩu"
      icon={<Lock size={18} />}
      error={touched.password && !formData.password}
      errorMessage={touched.password && !formData.password ? "Vui lòng nhập giá trị" : undefined}
    >
      <Password
        type="password"
        placeholder="Nhập mật khẩu"
        value={formData.password}
        onChange={handleInputChange("password")}
        onBlur={handleInputBlur("password")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
    <InputBox
      label="Nhập lại mật khẩu"
      icon={<Lock size={18} />}
      error={touched.confirmPassword && !formData.confirmPassword}
      errorMessage={touched.confirmPassword && !formData.confirmPassword ? "Vui lòng nhập giá trị" : undefined}
    >
      <Password
        type="password"
        placeholder="Nhập lại mật khẩu"
        value={formData.confirmPassword}
        onChange={handleInputChange("confirmPassword")}
        onBlur={handleInputBlur("confirmPassword")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
  </Box>
);

const PersonalInfoRow1: React.FC<any> = ({
  formData,
  touched,
  handleInputChange,
  handleInputBlur,
  handleSelectChange,
  handleDateChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
    <InputBox
      label="Họ và Tên"
      icon={<User size={18} />}
      error={touched.fullName && !formData.fullName}
      errorMessage={touched.fullName && !formData.fullName ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Nhập họ và tên"
        value={formData.fullName}
        onChange={handleInputChange("fullName")}
        onBlur={handleInputBlur("fullName")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
    <InputBox label="Ngày sinh" icon={<Calendar size={18} />}>
      <DatePicker
        value={formData.birthDate}
        onChange={handleDateChange("birthDate")}
        placeholder="Chọn ngày"
        label={undefined}
      />
    </InputBox>
    <InputBox label="Giới tính" icon={<Venus size={18} />}>
      <SingleSelect
        options={genderOptions}
        value={formData.gender}
        onChange={handleSelectChange("gender")}
        placeholder="Chọn giới tính"
      />
    </InputBox>
  </div>
);

const PersonalInfoRow2: React.FC<any> = ({
  formData,
  touched,
  handleInputChange,
  handleInputBlur,
  handleSelectChange,
  handleDateChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
    <InputBox
      label="Căn Cước Công Dân"
      icon={<IdCard size={18} />}
      error={touched.idCard && !formData.idCard}
      errorMessage={touched.idCard && !formData.idCard ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Nhập số CCCD"
        value={formData.idCard}
        onChange={handleInputChange("idCard")}
        onBlur={handleInputBlur("idCard")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
    <InputBox label="Ngày cấp" icon={<Calendar size={18} />}>
      <DatePicker
        value={formData.issueDate}
        onChange={handleDateChange("issueDate")}
        placeholder="Chọn ngày"
        label={undefined}
      />
    </InputBox>
    <InputBox
      label="Nơi cấp"
      icon={<MapPin size={18} />}
      error={touched.issuePlace && !formData.issuePlace}
      errorMessage={touched.issuePlace && !formData.issuePlace ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Nơi cấp"
        value={formData.issuePlace}
        onChange={handleInputChange("issuePlace")}
        onBlur={handleInputBlur("issuePlace")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
  </div>
);

const PersonalInfoRow3: React.FC<any> = ({
  formData,
  touched,
  handleInputChange,
  handleInputBlur,
  handleSelectChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
    <InputBox
      label="Số điện thoại"
      icon={<Phone size={18} />}
      error={touched.phone && !formData.phone}
      errorMessage={touched.phone && !formData.phone ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Nhập số điện thoại"
        value={formData.phone}
        onChange={handleInputChange("phone")}
        onBlur={handleInputBlur("phone")}
        label={undefined}
        className="input-field"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={15}
      />
    </InputBox>
    <InputBox
      label="Email"
      icon={<Mail size={18} />}
      error={touched.email && !formData.email}
      errorMessage={touched.email && !formData.email ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Nhập email"
        value={formData.email}
        onChange={handleInputChange("email")}
        onBlur={handleInputBlur("email")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
    <InputBox label="Dân tộc" icon={<GraduationCap size={18} />}>
      <SingleSelect
        options={ethnicityOptions}
        value={formData.ethnicity}
        onChange={handleSelectChange("ethnicity")}
        placeholder="Chọn dân tộc"
      />
    </InputBox>
  </div>
);

const PersonalInfoRow4: React.FC<any> = ({
  formData,
  touched,
  handleInputChange,
  handleInputBlur,
  handleSelectChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
    <InputBox
      label="Địa chỉ liên lạc"
      icon={<MapPin size={18} />}
      error={touched.address && !formData.address}
      errorMessage={touched.address && !formData.address ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Nhập địa chỉ"
        value={formData.address}
        onChange={handleInputChange("address")}
        onBlur={handleInputBlur("address")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
    <InputBox label="Trình độ học vấn" icon={<GraduationCap size={18} />}>
      <SingleSelect
        options={educationLevelOptions}
        value={formData.educationLevel}
        onChange={handleSelectChange("educationLevel")}
        placeholder="Chọn trình độ"
      />
    </InputBox>
    <InputBox label="Trình độ CMKT cao nhất" icon={<GraduationCap size={18} />}>
      <SingleSelect
        options={cmktLevelOptions}
        value={formData.cmktLevel}
        onChange={handleSelectChange("cmktLevel")}
        placeholder="Chọn trình độ CMKT"
      />
    </InputBox>
  </div>
);

const PersonalInfoRow5: React.FC<any> = ({
  formData,
  touched,
  handleInputChange,
  handleInputBlur,
  handleSelectChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
    <InputBox
      label="Chuyên ngành đào tạo"
      icon={<GraduationCap size={18} />}
      error={touched.major && !formData.major}
      errorMessage={touched.major && !formData.major ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Nhập chuyên ngành đào tạo"
        value={formData.major}
        onChange={handleInputChange("major")}
        onBlur={handleInputBlur("major")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
    <InputBox
      label="Tên trường tốt nghiệp"
      icon={<Building size={18} />}
      error={touched.school && !formData.school}
      errorMessage={touched.school && !formData.school ? "Vui lòng nhập giá trị" : undefined}
    >
      <Input
        placeholder="Nhập tên trường"
        value={formData.school}
        onChange={handleInputChange("school")}
        onBlur={handleInputBlur("school")}
        label={undefined}
        className="input-field"
      />
    </InputBox>
    <InputBox label="Ngành nghề mong muốn" icon={<Briefcase size={18} />}>
      <MultiSelect
        options={desiredJobList}
        value={formData.desiredJob}
        onChange={(selected) => handleSelectChange("desiredJob")(selected)}
        max={2}
        placeholder="Chọn ngành nghề (tối đa 2)"
      />
    </InputBox>
  </div>
);

const PersonalInfoSection: React.FC<any> = (props) => (
  <Box className="space-y-4">
    <Text className="text-lg font-semibold text-gray-700 mb-2">
      Thông tin cá nhân
    </Text>
    <PersonalInfoRow1 {...props} />
    <PersonalInfoRow2 {...props} />
    <PersonalInfoRow3 {...props} />
    <PersonalInfoRow4 {...props} />
    <PersonalInfoRow5 {...props} />
  </Box>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <Page className="bg-gray-100 p-4 min-h-screen" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
      <Box className="card-section">
        {/* Title */}
        <Box
          className="flex justify-center mb-6 sm:mb-8"
        >
          <Box className="flex items-center space-x-2">
            <Text size="large" className="text-blue-500">
              🔍
            </Text>
            <Text.Header className="text-xl sm:text-2xl font-bold text-blue-800">
              ĐĂNG KÝ THÀNH VIÊN
            </Text.Header>
          </Box>
        </Box>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <LoginInfoSection
            formData={formData}
            touched={touched}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
          />
          <PersonalInfoSection
            formData={formData}
            touched={touched}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
          />
          {/* Bottom: Note + Buttons */}
          <Box className="lg:col-span-4 mt-6 sm:mt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <Text className="text-sm text-gray-500">
              (*) Vui lòng nhập đầy đủ thông tin
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Button
                variant="primary"
                className="btn-primary"
                htmlType="submit"
              >
                Đăng Ký Ngay
              </Button>
              <Button className="btn-sky">
                Đăng Ký Cho Nhà Tuyển Dụng
              </Button>
              <Button className="btn-blue" onClick={() => navigate("/login")}
              >
                Quay Lại Đăng Nhập
              </Button>
            </div>
          </Box>
        </form>
      </Box>
    </Page>
  );
};

export default HomePage;
