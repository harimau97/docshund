import { NavLink, useLocation } from "react-router-dom";

// 상위 메뉴 항목 (메뉴 이름)
const mainMenuItems = [
  { name: "프로필", path: "profile" },
  { name: "보관함", path: "archive", defaultPath: "likeTrans" },
  { name: "활동", path: "activity", defaultPath: "myTrans" },
  { name: "메모장", path: "memo" },
  { name: "나의 문의", path: "inquiry" },
];

// 각 메뉴에 해당하는 하위 메뉴 항목 (하위 메뉴)
const subMenuItems = {
  archive: [
    { name: "관심 번역본", path: "likeTrans" },
    { name: "관심 게시글", path: "likeArticle" },
    { name: "관심 문서", path: "likeDocs" },
  ],
  activity: [
    { name: "나의 번역", path: "myTrans" },
    { name: "나의 게시글", path: "myArticle" },
    { name: "나의 댓글", path: "myComment" },
  ],
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-auto p-4 text-[#7D7C77]">
      <div className="border-1 border-gray-300 rounded-xl p-3 bg-[#FFFFFF]">
        {/* 상위 메뉴 항목 */}
        {mainMenuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <div key={item.path}>
              {/* 상위 메뉴 항목 (프로필, 보관함, 활동 등) */}
              <NavLink
                to={`/myPage/${item.path}/${item.defaultPath || ""}`}
                className={({ isActive: navLinkIsActive }) =>
                  `block py-2 px-4 mb-2 font-bold ${
                    isActive || navLinkIsActive
                      ? "text-[#bc5b39]"
                      : "text-[#7D7C77]"
                  }`
                }
              >
                {item.name}
              </NavLink>

              {/* 해당 항목에 하위 메뉴가 있을 때만 하위 메뉴 표시 */}
              {subMenuItems[item.path] && (
                <div className="ml-4">
                  {subMenuItems[item.path].map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={`/myPage/${item.path}/${subItem.path}`}
                      className={({ isActive: subNavLinkIsActive }) =>
                        `block py-2 px-8 mb-2 text-left ${
                          subNavLinkIsActive
                            ? "text-[#bc5b39]"
                            : "text-[#7D7C77]"
                        }`
                      }
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
