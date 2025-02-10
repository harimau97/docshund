import React, { useState, useEffect, useRef } from "react";
import { fetchReportList } from "../admin/Hooks/adminGetService";
import { MoveRight, Download } from "lucide-react";
import useUserManagerStore from "../../store/adminStore/userManagerStore";

const ManageReport = () => {
  const reportListData = useRef([]);
  const [reportList, setReportList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const { currentUserList, addUserList, removeUserList } =
    useUserManagerStore();

  const handleFilter = async (labels) => {
    if (labels === "all") {
      setReportList(reportListData.current);
    } else if (labels === "translate") {
      const tmpReportList = reportListData.current.filter(
        (report) => report.labels === "translate"
      );
      setReportList(tmpReportList);
    } else if (labels === "article") {
      const tmpReportList = reportListData.current.filter(
        (report) => report.labels === "article"
      );
      setReportList(tmpReportList);
    } else if (labels === "comment") {
      const tmpReportList = reportListData.current.filter(
        (report) => report.labels === "comment"
      );
      setReportList(tmpReportList);
    } else if (labels === "chat") {
      const tmpReportList = reportListData.current.filter(
        (report) => report.labels === "chat"
      );
      setReportList(tmpReportList);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchReportList(0, localStorage.getItem("userId"));
      reportListData.current = data;
      setReportList(data);
    };
    console.log(reportListData.current);
    console.log(currentUserList);
    fetchData();
  }, []);

  const filterButtons = [
    { label: "전체", value: "all" },
    { label: "번역본", value: "translate" },
    { label: "게시글", value: "article" },
    { label: "댓글", value: "comment" },
    { label: "채팅", value: "chat" },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">신고 관리</h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="이메일로 검색"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#bc5b39] focus:ring-1 focus:ring-[#bc5b39] transition-colors duration-200"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-start space-x-2 mb-4">
        {filterButtons.map((button) => (
          <button
            key={button.value}
            onClick={() => {
              handleFilter(button.value);
              setActiveFilter(button.value);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer duration-200 ${
              activeFilter === button.value
                ? "bg-[#bc5b39] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="flex gap-1 px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div>신고한 유저</div>
                  <MoveRight /> <div>신고된 유저</div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  신고일
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  첨부파일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportList.map((report) => (
                <tr
                  key={report.category}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(report.content);
                  }}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.category}
                  </td>
                  <td className="flex gap-1 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {currentUserList[report.userId]} <MoveRight />{" "}
                    {currentUserList[report.reportedUser]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        report.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {report.status === "active" ? "공개" : "비공개"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-[#bc5b39] hover:text-[#a34b2b] transition-colors duration-150 cursor-pointer">
                      <a
                        onClick={(e) => e.stopPropagation()}
                        download={report.reportFile}
                      >
                        <Download />
                      </a>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageReport;
