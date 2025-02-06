import axiosInstance from "../../utils/axiosInstance";

const InquiryService = {
  async submitInquiry(formData) {
    try {
      const response = await axiosInstance.post("/supports/inquiry", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("문의 등록하는 중 오류 발생:", error);
      return null;
    }
  },
};

export default InquiryService;
