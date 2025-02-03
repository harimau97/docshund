import PropTypes from "prop-types";

const alertModal = ({ alertTitle, alertText }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative w-1/6 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all duration-300 ease-in-out motion-safe:animate-[fadeIn_0.3s_ease-in-out] sm:my-8">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-center">
                <div className="mt-3 text-center">
                  <h3
                    className="text-base font-semibold text-gray-900 flex justify-center flex-col items-center gap-5"
                    id="modal-title"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg"
                      alt="체크 이미지"
                    />
                    {alertTitle}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{alertText}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

alertModal.propTypes = {
  alertTitle: PropTypes.string,
  alertText: PropTypes.string,
};
