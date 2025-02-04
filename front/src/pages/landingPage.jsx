import { useNavigate } from "react-router-dom";
import RectBtn from "../components/button/rectBtn";
import useAuth from "../utils/useAuth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="bg-[#f0eee5] min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-6 bg-gradient-to-r from-[#bc5b39] to-[#424242] text-transparent bg-clip-text">
            IT 문서 번역의 새로운 커뮤니티
          </h1>
          <p className="text-[clamp(1rem,2vw,1.5rem)] text-[#666666] mb-12 max-w-2xl mx-auto">
            전세계의 기술 문서를 함께 번역하고 토론하세요
          </p>
          <RectBtn
            onClick={() => navigate("/translate")}
            text="번역 시작하기"
            className="text-lg px-8 py-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          />
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "문서 번역",
              desc: "최신 IT 문서를 한글로 번역하고 공유하세요",
            },
            { title: "커뮤니티", desc: "번역에 대해 토론하고 의견을 나누세요" },
            {
              title: "헬프데스크",
              desc: "어려운 번역은 전문가의 도움을 받으세요",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-b from-white to-[#f8f8f8]"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-[#bc5b39] text-xl font-bold mb-4">
                {item.title}
              </h3>
              <p className="text-[#666666]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-12 bg-gradient-to-r from-[#bc5b39] to-[#424242] text-transparent bg-clip-text">
            함께 성장하는 번역 커뮤니티
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: 1234, label: "번역된 문서" },
              { number: 5678, label: "활성 사용자" },
              { number: 890, label: "주간 토론" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <motion.p
                  className="text-[#bc5b39] text-4xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                >
                  {stat.number}+
                </motion.p>
                <p className="text-[#666666]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-[#424242] to-[#323232] text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-6">
            지금 시작하세요
          </h2>
          <p className="mb-8 text-lg">함께 만들어가는 IT 문서 번역 커뮤니티</p>
          {!isAuthenticated() && (
            <RectBtn
              onClick={() => navigate("/translate")}
              text="무료로 시작하기"
              className="text-lg px-8 py-3 bg-[#bc5b39] transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#cc6b49]"
            />
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
