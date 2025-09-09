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
  Square,
  SquareCheck,
  User,
  Venus
} from "lucide-react";
import React, { useState } from "react";
import {
  Box,
  Button,
  DatePicker,
  Input,
  Page,
  Text
} from "zmp-ui";



// Custom bottom sheet select for desired job
const desiredJobList = [
  "Kỹ sư phần mềm",
  "Nhân viên kinh doanh",
  "Kế toán",
  "Thiết kế đồ họa",
  "Quản trị dự án",
  "Nhân sự",
  "Khác",
];

// Custom bottom sheet select component
type CustomBottomSheetSelectProps = {
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  max?: number;
  placeholder?: string;
};

const CustomBottomSheetSelect: React.FC<CustomBottomSheetSelectProps> = ({ options, value, onChange, max = 2, placeholder }) => {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string[]>(value || []);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setInternal(value || []);
  }, [value]);

  const handleSelect = (option: string) => {
    let next: string[];
    if (internal.includes(option)) {
      next = internal.filter((v) => v !== option);
    } else if (internal.length < max) {
      next = [...internal, option];
    } else {
      next = internal;
    }
    setInternal(next);
    onChange(next);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="w-full min-h-[40px] flex items-center border border-gray-300 rounded px-2 bg-white cursor-pointer"
        onClick={handleOpen}
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <span className={internal.length === 0 ? 'text-gray-400' : ''}>
          {internal.length === 0 ? placeholder : internal.join(', ')}
        </span>
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={handleClose}
            aria-label="Đóng"
            tabIndex={0}
            style={{ border: 'none', padding: 0, margin: 0, background: 'none' }}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
                e.preventDefault();
                handleClose();
              }
            }}
          />
          <div
            className="fixed left-0 right-0 bottom-0 z-50"
            style={{ transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)', transform: open ? 'translateY(0)' : 'translateY(100%)' }}
          >
            <div className="bg-white rounded-t-2xl shadow-lg p-4 h-[50vh]">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Chọn ngành nghề (tối đa {max})</span>
                <button onClick={handleClose} className="text-2xl leading-none">&times;</button>
              </div>
              <input
                type="text"
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
              />
              <ul className="space-y-2 overflow-y-auto h-[calc(50vh-140px)]">
                {options.filter(option => option.toLowerCase().includes(search.toLowerCase())).map((option) => {
                  const isSelected = internal.includes(option);
                  const isDisabled = !isSelected && internal.length >= max;
                  return (
                    <button
                      type="button"
                      key={option}
                      className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected ? 'text-blue-600 font-semibold' : ''} ${isDisabled ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                      onClick={() => !isDisabled && handleSelect(option)}
                      onKeyDown={e => {
                        if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
                          e.preventDefault();
                          handleSelect(option);
                        }
                      }}
                      disabled={isDisabled}
                      tabIndex={isDisabled ? -1 : 0}
                    >
                      <span className="flex-1">{option}</span>
                      {isSelected ? (
                        <SquareCheck size={20} className="text-blue-600 ml-2" />
                      ) : (
                        <Square size={20} className="text-gray-400 ml-2" />
                      )}
                    </button>
                  );
                })}
              </ul>
              <div className="pb-8">
                <button className="">
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

import ReactSelect from "react-select";

const { Password } = Input;

const InputBox: React.FC<{
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
}> = ({ label, icon, children, error, errorMessage }) => (
  <Box className="space-y-1 mb-4">
    <Text className="text-sm font-medium text-gray-600">{label}</Text>
    <Box
      className={`flex items-center border rounded-md px-3 min-h-[50px] h-[50px] ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        }`}
    >
      <span className={`mr-2 flex items-center ${error ? 'text-red-500' : 'text-gray-400'}`}>{icon}</span>
      <Box className="flex-1 flex items-center h-full">{children}</Box>
    </Box>
    {error && errorMessage && (
      <Text className="text-xs text-red-500 mt-1">{errorMessage}</Text>
    )}
  </Box>
);

const customSelectStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    minHeight: 40,
    border: 'none',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
    const color = '#6B7280';
    let backgroundColor = '';
    if (isDisabled) backgroundColor = '';
    else if (isSelected) backgroundColor = color;
    else if (isFocused) backgroundColor = 'rgba(107,114,128,0.1)';
    let optionColor = color;
    if (isDisabled) optionColor = '#ccc';
    else if (isSelected) optionColor = 'white';
    return {
      ...styles,
      backgroundColor,
      color: optionColor,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? color : 'rgba(107,114,128,0.2)'),
      },
    };
  },
};


const genderOptions = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
  { value: "Khác", label: "Khác" },
];
const ethnicityOptions = [
  { value: "Kinh", label: "Kinh" },
  { value: "Tày", label: "Tày" },
  { value: "Thái", label: "Thái" },
  { value: "Khác", label: "Khác" },
];
const educationLevelOptions = [
  { value: "Trung học", label: "Trung học" },
  { value: "Cao đẳng", label: "Cao đẳng" },
  { value: "Đại học", label: "Đại học" },
  { value: "Sau đại học", label: "Sau đại học" },
];

const cmktLevelOptions = [
  { value: "Sơ cấp", label: "Sơ cấp" },
  { value: "Trung cấp", label: "Trung cấp" },
  { value: "Cao cấp", label: "Cao cấp" },
  { value: "Khác", label: "Khác" },
];

// Options for desired job field
const desiredJobOptions = [
  { value: "Kỹ sư phần mềm", label: "Kỹ sư phần mềm" },
  { value: "Nhân viên kinh doanh", label: "Nhân viên kinh doanh" },
  { value: "Kế toán", label: "Kế toán" },
  { value: "Thiết kế đồ họa", label: "Thiết kế đồ họa" },
  { value: "Quản trị dự án", label: "Quản trị dự án" },
  { value: "Nhân sự", label: "Nhân sự" },
  { value: "Khác", label: "Khác" }
];

// Custom bottom sheet select component

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    idCard: "",
    phone: "",
    email: "",
    ethnicity: "",
    address: "",
    major: "",
    birthDate: undefined as Date | undefined,
    gender: "",
    issueDate: undefined as Date | undefined,
    issuePlace: "",
    educationLevel: "",
    cmktLevel: "",
    desiredJob: [] as string[],
    school: "",
  });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});


  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (field === "phone") {
        // Only allow numbers
        value = value.replace(/\D/g, "");
      }
      setFormData((prev) => ({ ...prev, [field]: value }));
    };


  const handleInputBlur = (field: string) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSelectChange = (field: string) => (value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string) => (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Page className="bg-gray-100 p-4 min-h-screen">
      <Box className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-6 sm:p-8 mx-auto">
        {/* Title */}
        <Box
          className="flex justify-center mb-6 sm:mb-8"
          style={{ paddingTop: 'calc(16px + env(safe-area-inset-top, 0px))' }}
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
          {/* Column 1: Login info */}
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
                className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
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
                className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
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
                className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
              />
            </InputBox>
          </Box>

          {/* Column 2: Personal info */}
          <Box className="space-y-4">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              Thông tin cá nhân
            </Text>

            {/* First row */}
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
                  className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
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
                <div style={{ width: '100%', paddingLeft: 4 }}>
                  <ReactSelect
                    value={genderOptions.find(opt => opt.value === formData.gender) || null}
                    onChange={option => handleSelectChange("gender")(option ? option.value : "")}
                    options={genderOptions}
                    placeholder="Chọn giới tính"
                    isClearable
                    styles={customSelectStyles}
                    isSearchable
                  />
                </div>
              </InputBox>
            </div>

            {/* Second row */}
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
                  className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
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
                  className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
                />
              </InputBox>
            </div>

            {/* Third row */}
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
                  className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
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
                  className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
                />
              </InputBox>

              <InputBox label="Dân tộc" icon={<GraduationCap size={18} />}>
                <div style={{ width: '100%', paddingLeft: 4 }}>
                  <ReactSelect
                    value={ethnicityOptions.find(opt => opt.value === formData.ethnicity) || null}
                    onChange={option => handleSelectChange("ethnicity")(option ? option.value : "")}
                    options={ethnicityOptions}
                    placeholder="Chọn dân tộc"
                    isClearable
                    styles={customSelectStyles}
                    isSearchable
                  />
                </div>
              </InputBox>
            </div>

            {/* Fourth row */}
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
                  className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
                />
              </InputBox>

              <InputBox label="Trình độ học vấn" icon={<GraduationCap size={18} />}>
                <div style={{ width: '100%', paddingLeft: 4 }}>
                  <ReactSelect
                    value={educationLevelOptions.find(opt => opt.value === formData.educationLevel) || null}
                    onChange={option => handleSelectChange("educationLevel")(option ? option.value : "")}
                    options={educationLevelOptions}
                    placeholder="Chọn trình độ"
                    isClearable
                    styles={customSelectStyles}
                    isSearchable
                  />
                </div>
              </InputBox>

              <InputBox label="Trình độ CMKT cao nhất" icon={<GraduationCap size={18} />}>
                <div style={{ width: '100%', paddingLeft: 4 }}>
                  <ReactSelect
                    value={cmktLevelOptions.find(opt => opt.value === formData.cmktLevel) || null}
                    onChange={option => handleSelectChange("cmktLevel")(option ? option.value : "")}
                    options={cmktLevelOptions}
                    placeholder="Chọn trình độ CMKT"
                    isClearable
                    styles={customSelectStyles}
                    isSearchable
                  />
                </div>
              </InputBox>
            </div>

            {/* Fifth row */}
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
                  className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
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
                  className="border-none shadow-none focus:ring-0 bg-transparent placeholder-gray-400"
                />
              </InputBox>

              <InputBox label="Ngành nghề mong muốn" icon={<Briefcase size={18} />}>
                <CustomBottomSheetSelect
                  options={desiredJobList}
                  value={formData.desiredJob}
                  onChange={(selected) => handleSelectChange("desiredJob")(selected)}
                  max={2}
                  placeholder="Chọn ngành nghề (tối đa 2)"
                />
              </InputBox>
            </div>
          </Box>

          {/* Bottom: Note + Buttons */}
          <Box className="lg:col-span-4 mt-6 sm:mt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <Text className="text-sm text-gray-500">
              (*) Vui lòng nhập đầy đủ thông tin
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Button
                variant="primary"
                className="bg-green-500 hover:bg-green-600 rounded-md h-12 px-6 text-sm text-white"
                htmlType="submit"
              >
                Đăng Ký Ngay
              </Button>
              <Button className="bg-sky-600 hover:bg-sky-700 rounded-md h-12 px-6 text-sm text-white">
                Đăng Ký Cho Nhà Tuyển Dụng
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-md h-12 px-6 text-sm text-white">
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
