/**
 * 게시글 목록과 페이징 정보를 포함하는 데이터 구조
 * @typedef {Object} ArticleListExample
 * 
 * 

 * 

 */

const ArticleListExample = {
  /**
   * @property {Array<Object>} content - 게시글 목록 배열
   * @property {Object[]} content.article - 개별 게시글 정보
   * @property {number} content.article.articleId - 게시글 고유 식별자
   * @property {number} content.article.docsId - 연관된 문서 식별자
   * @property {string} content.article.position - 게시글 카테고리 (예: "BACKEND")
   * @property {string} content.article.documentName - 연관된 문서 이름
   * @property {string} content.article.title - 게시글 제목
   * @property {string} content.article.content - 게시글 본문
   * @property {string} content.article.createdAt - 게시글 생성 시간
   * @property {string} content.article.updatedAt - 게시글 수정 시간
   * @property {number} content.article.viewCount - 조회수
   * @property {number} content.article.likeCount - 좋아요 수
   * @property {number} content.article.commentCount - 댓글 수
   * @property {number} content.article.userId - 작성자 식별자
   * @property {string} content.article.nickname - 작성자 닉네임
   * @property {string} content.article.profileImage - 작성자 프로필 이미지 URL
   * @property {boolean} content.article.isLiked - 현재 사용자의 좋아요 여부
   *
   */
  content: [
    {
      articleId: 6,
      docsId: 106,
      position: "BACKEND",
      documentName: "Spring Security Guide",
      title: "Spring Security로 OAuth2 인증 적용하기",
      content: "OAuth2를 사용하여 보안 인증을 강화하는 방법을 설명합니다.",
      createdAt: "2024-01-20T14:00:00",
      updatedAt: "2024-01-22T10:30:00",
      viewCount: 320,
      likeCount: 45,
      commentCount: 8,
      userId: 1010,
      nickname: "secure_dev",
      profileImage: "https://example.com/profiles/1010.png",
      isLiked: false,
    },
    {
      articleId: 7,
      docsId: 107,
      position: "BACKEND",
      documentName: "Spring Boot Deep Dive",
      title: "Spring Boot에서 비동기 처리 최적화하기",
      content: "비동기 처리를 통해 성능을 개선하는 전략을 소개합니다.",
      createdAt: "2024-01-18T11:30:00",
      updatedAt: "2024-01-19T13:15:00",
      viewCount: 280,
      likeCount: 40,
      commentCount: 6,
      userId: 1008,
      nickname: "async_master",
      profileImage: "https://example.com/profiles/1008.png",
      isLiked: true,
    },
    {
      articleId: 8,
      docsId: 108,
      position: "BACKEND",
      documentName: "Spring AOP Guide",
      title: "Spring AOP를 활용한 로깅 및 트랜잭션 관리",
      content:
        "AOP를 이용하여 로깅과 트랜잭션을 효율적으로 관리하는 방법을 다룹니다.",
      createdAt: "2024-01-15T16:45:00",
      updatedAt: "2024-01-16T09:20:00",
      viewCount: 250,
      likeCount: 38,
      commentCount: 5,
      userId: 1012,
      nickname: "aop_guru",
      profileImage: "https://example.com/profiles/1012.png",
      isLiked: true,
    },
    {
      articleId: 9,
      docsId: 109,
      position: "BACKEND",
      documentName: "Spring Cloud Basics",
      title: "Spring Cloud로 MSA 환경 구축하기",
      content:
        "MSA(Microservices) 환경에서 Spring Cloud를 활용하는 기초 가이드입니다.",
      createdAt: "2024-01-12T10:10:00",
      updatedAt: "2024-01-14T08:30:00",
      viewCount: 220,
      likeCount: 35,
      commentCount: 7,
      userId: 1005,
      nickname: "msa_builder",
      profileImage: "https://example.com/profiles/1005.png",
      isLiked: false,
    },
    {
      articleId: 10,
      docsId: 110,
      position: "BACKEND",
      documentName: "Spring WebFlux Guide",
      title: "Spring WebFlux로 반응형 프로그래밍하기",
      content:
        "WebFlux를 활용하여 비동기와 반응형 프로그래밍을 구현하는 방법을 설명합니다.",
      createdAt: "2024-01-10T13:50:00",
      updatedAt: "2024-01-11T15:25:00",
      viewCount: 200,
      likeCount: 30,
      commentCount: 4,
      userId: 1011,
      nickname: "reactive_coder",
      profileImage: "https://example.com/profiles/1011.png",
      isLiked: true,
    },
  ],

  /** 페이지네이션 정보
   * @property {Object} pageable - 페이징 설정 정보
   * @property {number} pageable.pageNumber - 현재 페이지 번호 (0-based)
   * @property {number} pageable.pageSize - 페이지당 항목 수
   * @property {Object} pageable.sort - 정렬 정보
   */
  pageable: {
    pageNumber: 1, // 현재 페이지 번호
    pageSize: 5, // 페이지당 항목 수
    sort: {
      // 정렬 정보
      sorted: true,
      unsorted: false,
      empty: false,
    },
  },

  /**
   * @property {number} totalPages - 전체 페이지 수
   * @property {number} totalElements - 전체 게시글 수
   * @property {boolean} last - 현재 페이지가 마지막 페이지인지 여부
   * @property {boolean} first - 현재 페이지가 첫 페이지인지 여부
   * @property {number} size - 페이지당 게시글 수
   * @property {number} number - 현재 페이지 번호
   */
  totalPages: 3, // 전체 페이지 수
  totalElements: 15, // 전체 게시글 수
  last: false, // 마지막 페이지 여부
  first: false, // 첫 페이지 여부
  size: 5, // 페이지당 게시글 수
  number: 1, // 현재 페이지 번호

  /** 정렬 정보
   * @property {Object} sort - 전체 목록 정렬 정보
   * @property {boolean} sort.sorted - 정렬 적용 여부
   * @property {boolean} sort.unsorted - 미정렬 여부
   * @property {boolean} sort.empty - 정렬 정보 존재 여부
   *
   */
  sort: {
    sorted: true,
    unsorted: false,
    empty: false,
  },

  /**
   * @property {number} numberOfElements - 현재 페이지의 실제 게시글 수
   * @property {boolean} empty - 현재 페이지가 비어있는지 여부
   */
  numberOfElements: 5, // 현재 페이지의 게시글 수
  empty: false, // 비어있는지 여부
};

export default ArticleListExample;
