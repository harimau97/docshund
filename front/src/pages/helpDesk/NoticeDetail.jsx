import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useNoticeStore from "../../store/helpDeskStore/noticeStore";
import NoticeService from "../../services/helpDeskServices/noticeService";

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const { noticeDetail, setNoticeDetail, setLoading, setError } =
    useNoticeStore();

  useEffect(() => {
    const fetchNoticeDetail = async (noticeId) => {
      setLoading(true);
      try {
        const data = await NoticeService.fetchNoticeDetail(noticeId);
        setNoticeDetail(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail(noticeId);
  }, [noticeId, setError, setLoading, setNoticeDetail]);

  return (
    <div className="flex justify-center w-full">
      <main className="flex-1 p-8 max-w-[1280px]">
        <div className="flex justify-between mt-5 mb-5">
          <h1 className="pl-4 font-bold text-2xl">공지사항</h1>
          <Link
            to="/helpDesk/notices"
            className="py-2 px-4 bg-[#bc5b39] text-white rounded-md shadow-sm hover:bg-[#C96442]"
          >
            목록으로
          </Link>
        </div>
        <div className="bg-white rounded-tl-xl rounded-tr-xl border-t rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF]">
          <div className="p-6">
            <div className="border-b border-[#E1E1DF] pb-4 mb-4">
              <h1 className="text-2xl font-bold mb-2">{noticeDetail.title}</h1>
              <div className="flex justify-between items-center text-[#7d7c77]">
                <span className="whitespace-nowrap">
                  {noticeDetail.createdAt
                    ? noticeDetail.createdAt.split("T")[0]
                    : ""}
                </span>
              </div>
            </div>
            <div className="border-b border-[#E1E1DF] pb-4 mb-4">
              <div className="min-h-[200px] whitespace-pre-wrap mb-6">
                {noticeDetail.content}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NoticeDetail;
