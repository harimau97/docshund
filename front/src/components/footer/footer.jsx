const Footer = () => {
  let footerChild = "text-[#f8f8f7] text-left text-[14px] font-semibold";
  return (
    <div className="box-border bg-black px-[120px] py-[90px] flex flex-col gap-[10px] items-center justify-center h-[190px] relative">
      <div className="flex flex-col gap-[47px] items-center justify-center shrink-0 w-full relative">
        <div className="bg-white border-b border-white opacity-[0.6] self-stretch relative"></div>
        <div className="flex flex-row items-center justify-center self-stretch shrink-0 relative">
          <div className="flex flex-row gap-[36px] items-start justify-start shrink-0 relative">
            <div className={footerChild}>이용약관</div>
            <div className={footerChild}>개인정보처리방침</div>
            <div className={footerChild}>공지사항</div>
            <div className={footerChild}>FAQ</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
