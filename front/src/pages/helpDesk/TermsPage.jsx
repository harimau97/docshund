const TermsPage = () => {
  return (
    <div className="flex justify-center w-full">
      <main className="flex-1 p-8 max-w-[1280px]">
        <div className="flex justify-between mt-5 mb-5">
          <h1 className="font-bold text-2xl">이용약관</h1>
        </div>
        <div className="bg-white rounded-tl-xl rounded-tr-xl border-t rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF]">
          <div className="p-15">
            <div className="border-t border-b border-[#E1E1DF] pb-4 mb-4">
              <div className="min-h-[200px] whitespace-pre-wrap mb-6 mt-6">
                이용약관 내용
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
