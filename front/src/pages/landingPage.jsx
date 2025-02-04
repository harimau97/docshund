import { useNavigate } from "react-router-dom";
import RectBtn from "../components/button/rectBtn";
import useAuth from "../utils/useAuth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, MessageSquare } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentSlogan, setCurrentSlogan] = useState(0);

  const slogans = [
    "IT 문서 번역의 새로운 커뮤니티",
    "공식문서 학습, 이제 쉽고 빠르게!",
    "번역과 학습을 동시에! 공식문서 마스터하기",
  ];

  const testimonials = [
    {
      text: "이전에는 공식문서를 읽기 어려웠는데, 이제는 쉽게 접근할 수 있어요!",
      name: "김개발",
      role: "프론트엔드 개발자",
      company: "네이버",
    },
    {
      text: "커뮤니티와 함께 번역을 개선하면서 더 깊이 이해할 수 있었습니다.",
      name: "이코딩",
      role: "백엔드 개발자",
      company: "카카오",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="py-24 px-4 bg-gradient-to-b from-white to-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="mb-4 text-blue-600 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            👨‍💻 개발자 10,000명+가 이미 사용 중!
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text"
            key={currentSlogan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {slogans[currentSlogan]}
          </motion.h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            전 세계 개발자의 70%가 공식문서를 읽을 때 번역기를 사용합니다. 이제
            더 나은 방법으로 함께 배워보세요!
          </p>
          <RectBtn
            onClick={() => navigate("/translate")}
            text="🎉 지금 무료로 체험하기"
            className="text-lg px-8 py-4 bg-blue-600 text-white rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-blue-700"
          />
          <p className="mt-4 text-sm text-gray-500">
            1분 만에 가입하고, 바로 시작하세요!
          </p>
        </div>
      </motion.section>

      {/* Problem Section */}
      <motion.section
        className="py-16 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            개발자들이 겪는 실제 문제들
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-red-50 rounded-lg">
              <h3 className="text-xl font-bold text-red-600 mb-4">❌ Before</h3>
              <ul className="space-y-4">
                <li>
                  • &quot;영어 공식문서를 읽다가 구글 번역기에 의존했어요&quot;
                </li>
                <li>
                  • &quot;원하는 정보를 찾느라 시간을 너무 많이 썼죠&quot;
                </li>
                <li>• &quot;번역이 애매해서 결국 포기했어요&quot;</li>
              </ul>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-bold text-green-600 mb-4">
                ✅ After
              </h3>
              <ul className="space-y-4">
                <li>• &quot;2배 빠른 학습 - 원문과 번역을 동시에!&quot;</li>
                <li>• &quot;커뮤니티와 함께 더 정확한 번역을&quot;</li>
                <li>• &quot;실시간 토론으로 더 깊이있는 이해&quot;</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-blue-600" />,
                title: "스마트 번역",
                desc: "AI 기반 문맥 이해로 2배 빠른 번역",
              },
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: "실시간 커뮤니티",
                desc: "함께 토론하고 개선하는 번역",
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
                title: "전문가 헬프데스크",
                desc: "어려운 부분은 전문가와 상담",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg transition duration-300 hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            개발자들의 이야기
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg mb-4">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full mr-4"></div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            자주 묻는 질문
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-bold mb-4">
                이 서비스는 무료인가요?
              </h3>
              <p className="text-gray-600">
                네! 기본 기능은 완전히 무료입니다. 프리미엄 기능은 선택적으로
                이용하실 수 있습니다.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-bold mb-4">
                어떤 공식문서를 지원하나요?
              </h3>
              <p className="text-gray-600">
                주요 프로그래밍 언어와 프레임워크 문서를 지원합니다. 현재
                100,000개 이상의 문서가 번역되어 있습니다.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">지금 시작하세요</h2>
          <p className="mb-8 text-xl">
            이미 10,000명 이상의 개발자가 함께하고 있습니다
          </p>
          {!isAuthenticated() && (
            <RectBtn
              onClick={() => navigate("/translate")}
              text="🚀 1분 만에 시작하기"
              className="text-lg px-8 py-4 bg-white text-blue-600 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
            />
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
