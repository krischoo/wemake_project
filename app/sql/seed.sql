-- categories 테이블 시드 데이터
INSERT INTO categories (name, description, created_at, updated_at)
VALUES
  ('생산성', '생산성을 높이는 도구와 앱', NOW(), NOW()),
  ('디자인', '디자인 도구와 리소스', NOW(), NOW()),
  ('개발', '개발자를 위한 도구와 서비스', NOW(), NOW()),
  ('마케팅', '마케팅 및 성장 도구', NOW(), NOW()),
  ('금융', '금융 및 투자 도구', NOW(), NOW());

-- products 테이블 시드 데이터
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at)
VALUES
  ('북클럽', '함께 읽고 토론하는 독서 앱', '독서를 좋아하는 사람들이 함께 책을 읽고 토론할 수 있는 플랫폼입니다.', '매주 새로운 책을 선정하고 함께 읽으며 토론합니다.', 'https://example.com/icons/bookclub.png', 'https://bookclub.example.com', '{"views": 1200, "reviews": 45}', '8064861c-749d-42ad-8d6f-fb03f608a32d', 1, NOW(), NOW()),
  ('디자인허브', '디자이너를 위한 리소스 모음', '디자이너들이 필요한 모든 리소스를 한 곳에서 찾을 수 있습니다.', '다양한 디자인 리소스를 카테고리별로 제공합니다.', 'https://example.com/icons/designhub.png', 'https://designhub.example.com', '{"views": 980, "reviews": 32}', '8064861c-749d-42ad-8d6f-fb03f608a32d', 2, NOW(), NOW()),
  ('코드메이트', '개발자를 위한 페어 프로그래밍 도구', '원격으로 함께 코딩할 수 있는 실시간 협업 도구입니다.', '실시간 코드 공유와 화상 통화를 통해 함께 코딩합니다.', 'https://example.com/icons/codemate.png', 'https://codemate.example.com', '{"views": 1500, "reviews": 78}', '8064861c-749d-42ad-8d6f-fb03f608a32d', 3, NOW(), NOW()),
  ('그로스헌터', '스타트업을 위한 성장 도구', '스타트업의 성장을 돕는 마케팅 자동화 도구입니다.', '고객 데이터를 분석하고 자동화된 마케팅 캠페인을 실행합니다.', 'https://example.com/icons/growthhunter.png', 'https://growthhunter.example.com', '{"views": 850, "reviews": 29}', '8064861c-749d-42ad-8d6f-fb03f608a32d', 4, NOW(), NOW()),
  ('머니트래커', '개인 재무 관리 앱', '수입과 지출을 쉽게 관리하고 재무 목표를 설정할 수 있습니다.', '은행 계좌를 연동하여 자동으로 거래를 분류하고 분석합니다.', 'https://example.com/icons/moneytracker.png', 'https://moneytracker.example.com', '{"views": 1100, "reviews": 52}', '8064861c-749d-42ad-8d6f-fb03f608a32d', 5, NOW(), NOW());

-- reviews 테이블 시드 데이터
INSERT INTO reviews (product_id, profile_id, rating, review, created_at, updated_at)
VALUES
  (1, '8064861c-749d-42ad-8d6f-fb03f608a32d', 5, '독서를 좋아하는 사람으로서 정말 유용한 앱입니다. 다양한 사람들과 책에 대해 이야기할 수 있어 좋아요.', NOW(), NOW()),
  (2, '8064861c-749d-42ad-8d6f-fb03f608a32d', 4, '디자인 리소스를 찾는 데 많은 도움이 됩니다. 인터페이스가 직관적이고 사용하기 쉬워요.', NOW(), NOW()),
  (3, '8064861c-749d-42ad-8d6f-fb03f608a32d', 5, '원격으로 페어 프로그래밍을 할 때 정말 유용합니다. 실시간 협업 기능이 뛰어나요.', NOW(), NOW()),
  (4, '8064861c-749d-42ad-8d6f-fb03f608a32d', 3, '기능은 좋지만 UI가 조금 복잡합니다. 초보자에게는 어려울 수 있어요.', NOW(), NOW()),
  (5, '8064861c-749d-42ad-8d6f-fb03f608a32d', 4, '재무 관리를 쉽게 할 수 있어 좋습니다. 예산 설정 기능이 특히 유용해요.', NOW(), NOW());

-- topics 테이블 시드 데이터
INSERT INTO topics (name, slug, created_at)
VALUES
  ('독서', 'reading', NOW()),
  ('프로그래밍', 'programming', NOW()),
  ('디자인', 'design', NOW()),
  ('창업', 'startup', NOW()),
  ('투자', 'investment', NOW());

-- posts 테이블 시드 데이터
INSERT INTO posts (title, content, topic_id, created_at, updated_at, profile_id)
VALUES
  ('좋은 책을 고르는 방법', '좋은 책을 고르는 방법에 대해 공유합니다. 첫째, 관심 분야를 명확히 하세요...', 1, NOW(), NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d'),
  ('프로그래밍 입문자를 위한 조언', '프로그래밍을 시작하는 분들에게 도움이 될 만한 조언을 드립니다...', 2, NOW(), NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d'),
  ('효과적인 UI 디자인 원칙', 'UI 디자인을 할 때 고려해야 할 중요한 원칙들을 소개합니다...', 3, NOW(), NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d'),
  ('스타트업 아이디어 검증하기', '스타트업 아이디어를 효과적으로 검증하는 방법에 대해 이야기합니다...', 4, NOW(), NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d'),
  ('초보자를 위한 투자 전략', '투자를 처음 시작하는 분들을 위한 기본적인 투자 전략을 소개합니다...', 5, NOW(), NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d');

-- post_replies 테이블 시드 데이터
INSERT INTO post_replies (post_id, parent_id, profile_id, reply, created_at, updated_at)
VALUES
  (1, NULL, '8064861c-749d-42ad-8d6f-fb03f608a32d', '정말 유용한 정보 감사합니다. 저도 책 고를 때 항상 고민이었어요.', NOW(), NOW()),
  (2, NULL, '8064861c-749d-42ad-8d6f-fb03f608a32d', '프로그래밍 입문자로서 많은 도움이 됐습니다. 추천하는 언어가 있을까요?', NOW(), NOW()),
  (3, NULL, '8064861c-749d-42ad-8d6f-fb03f608a32d', 'UI 디자인에 대한 좋은 인사이트 감사합니다. 색상 선택에 대한 팁도 있을까요?', NOW(), NOW()),
  (4, NULL, '8064861c-749d-42ad-8d6f-fb03f608a32d', '아이디어 검증 단계에서 MVP를 어떻게 설계하는 것이 좋을까요?', NOW(), NOW()),
  (5, NULL, '8064861c-749d-42ad-8d6f-fb03f608a32d', '초보자를 위한 추천 ETF가 있을까요?', NOW(), NOW());

-- gpt_ideas 테이블 시드 데이터
INSERT INTO gpt_ideas (idea, views, claimed_at, claimed_by, created_at)
VALUES
  ('AI를 활용한 개인 맞춤형 독서 추천 서비스', 145, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('개발자와 디자이너를 연결하는 프로젝트 협업 플랫폼', 178, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('일상 대화를 통한 외국어 학습 앱', 132, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('지역 소상공인을 위한 디지털 마케팅 도구', 156, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('건강한 식습관을 위한 식단 계획 및 쇼핑 도우미', 167, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('AI 기반 개인 맞춤형 운동 코치 서비스', 189, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('재택근무자를 위한 업무 생산성 도구', 143, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('반려동물 케어 서비스 매칭 플랫폼', 165, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('실시간 법률 상담 서비스 플랫폼', 134, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW()),
  ('친환경 제품 중고거래 커뮤니티', 198, NOW(), '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW());

-- teams 테이블 시드 데이터
INSERT INTO teams (product_name, product_stage, team_size, equity_split, roles, product_description, created_at, updated_at)
VALUES
  ('리더보드', 'development', 3, 33, '개발자, 디자이너, 마케터', '독서 습관을 게임화하여 동기부여를 제공하는 앱', NOW(), NOW()),
  ('코드스페이스', 'planning', 2, 50, '개발자, 기획자', '클라우드 기반 개발 환경을 제공하는 서비스', NOW(), NOW()),
  ('디자인팩토리', 'design', 4, 25, '디자이너, 개발자, 마케터, 기획자', '디자인 에셋을 쉽게 만들고 공유할 수 있는 플랫폼', NOW(), NOW()),
  ('그로스엔진', 'launch', 3, 33, '마케터, 개발자, 데이터 분석가', '데이터 기반 마케팅 자동화 도구', NOW(), NOW()),
  ('인베스트메이트', 'growth', 5, 20, '개발자, 금융 전문가, 디자이너, 마케터, 기획자', '초보자를 위한 투자 교육 및 시뮬레이션 플랫폼', NOW(), NOW());

-- message_rooms 테이블 시드 데이터
INSERT INTO message_rooms (created_at)
VALUES
  (NOW()),
  (NOW()),
  (NOW()),
  (NOW()),
  (NOW());

-- messages 테이블 시드 데이터
INSERT INTO messages (message_room_id, sender_id, content, created_at)
VALUES
  (1, '8064861c-749d-42ad-8d6f-fb03f608a32d', '안녕하세요! 북클럽 프로젝트에 관심 있으신가요?', NOW()),
  (2, '8064861c-749d-42ad-8d6f-fb03f608a32d', '디자인허브 베타 테스터를 모집하고 있습니다.', NOW()),
  (3, '8064861c-749d-42ad-8d6f-fb03f608a32d', '코드메이트 협업 기능에 대한 피드백 부탁드립니다.', NOW()),
  (4, '8064861c-749d-42ad-8d6f-fb03f608a32d', '그로스헌터 마케팅 전략에 대해 논의해 보고 싶습니다.', NOW()),
  (5, '8064861c-749d-42ad-8d6f-fb03f608a32d', '머니트래커 새 기능 아이디어가 있으신가요?', NOW());

-- jobs 테이블 시드 데이터
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range, created_at, updated_at)
VALUES
  ('프론트엔드 개발자', '사용자 경험을 중시하는 웹 애플리케이션 개발', '사용자 인터페이스 개발, 성능 최적화, 코드 리뷰', '2년 이상의 React 경험, TypeScript 능숙', '유연한 근무 시간, 원격 근무 가능, 교육 지원', 'React, TypeScript, CSS, Git', '테크스타트', 'https://example.com/logos/techstart.png', '서울 강남구', 'https://techstart.example.com/careers', 'full-time', 'hybrid', '5천만원 ~ 7천만원', NOW(), NOW()),
  ('백엔드 개발자', '확장 가능한 서버 아키텍처 설계 및 구현', 'API 개발, 데이터베이스 설계, 서버 최적화', '3년 이상의 Node.js 경험, SQL/NoSQL 데이터베이스 경험', '스톡옵션, 건강보험, 점심 제공', 'Node.js, PostgreSQL, Docker, AWS', '클라우드테크', 'https://example.com/logos/cloudtech.png', '서울 서초구', 'https://cloudtech.example.com/jobs', 'full-time', 'in-person', '7천만원 ~ 1억원', NOW(), NOW()),
  ('UX/UI 디자이너', '사용자 중심 디자인 솔루션 개발', '사용자 리서치, 와이어프레임 제작, 프로토타입 개발', '포트폴리오 필수, Figma 능숙', '창의적인 작업 환경, 디자인 컨퍼런스 참가 지원', 'Figma, Adobe XD, Sketch, 사용자 리서치', '디자인랩', 'https://example.com/logos/designlab.png', '서울 성동구', 'https://designlab.example.com/careers', 'full-time', 'hybrid', '5천만원 ~ 7천만원', NOW(), NOW()),
  ('데이터 분석가', '비즈니스 인사이트 도출을 위한 데이터 분석', '데이터 수집 및 정제, 분석 모델 개발, 시각화', '통계학 또는 관련 분야 학위, SQL 능숙', '탄력근무제, 자기계발비 지원', 'Python, SQL, Tableau, 통계 분석', '데이터인사이트', 'https://example.com/logos/datainsight.png', '서울 영등포구', 'https://datainsight.example.com/join', 'full-time', 'remote', '5천만원 ~ 7천만원', NOW(), NOW()),
  ('마케팅 매니저', '디지털 마케팅 전략 수립 및 실행', '캠페인 기획, 성과 분석, 콘텐츠 전략 수립', '3년 이상의 디지털 마케팅 경험, 데이터 분석 능력', '성과 보너스, 마케팅 교육 지원', 'Google Analytics, Facebook Ads, SEO, 콘텐츠 마케팅', '그로스마케팅', 'https://example.com/logos/growthmarketing.png', '서울 마포구', 'https://growthmarketing.example.com/careers', 'full-time', 'in-person', '5천만원 ~ 7천만원', NOW(), NOW());

-- 복합 기본 키가 있는 연결 테이블에 1개의 행만 추가
-- product_upvotes 테이블 시드 데이터
INSERT INTO product_upvotes (product_id, profile_id)
VALUES
  (1, '8064861c-749d-42ad-8d6f-fb03f608a32d');

-- message_room_members 테이블 시드 데이터
INSERT INTO message_room_members (message_room_id, profile_id)
VALUES
  (1, '8064861c-749d-42ad-8d6f-fb03f608a32d');

-- post_upvotes 테이블 시드 데이터
INSERT INTO post_upvotes (post_id, profile_id)
VALUES
  (1, '8064861c-749d-42ad-8d6f-fb03f608a32d');

-- gpt_ideas_likes 테이블 시드 데이터
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id)
VALUES
  (1, '8064861c-749d-42ad-8d6f-fb03f608a32d');

-- follows 테이블 시드 데이터
INSERT INTO follows (follower_id, following_id, created_at)
VALUES
  ('8064861c-749d-42ad-8d6f-fb03f608a32d', '8064861c-749d-42ad-8d6f-fb03f608a32d', NOW());

-- notifications 테이블 시드 데이터
INSERT INTO notifications (source_id, product_id, post_id, target_id, type, created_at)
VALUES
  ('8064861c-749d-42ad-8d6f-fb03f608a32d', NULL, NULL, '8064861c-749d-42ad-8d6f-fb03f608a32d', 'follow', NOW()),
  ('8064861c-749d-42ad-8d6f-fb03f608a32d', 1, NULL, '8064861c-749d-42ad-8d6f-fb03f608a32d', 'review', NOW()),
  ('8064861c-749d-42ad-8d6f-fb03f608a32d', NULL, 1, '8064861c-749d-42ad-8d6f-fb03f608a32d', 'reply', NOW()),
  ('8064861c-749d-42ad-8d6f-fb03f608a32d', NULL, 2, '8064861c-749d-42ad-8d6f-fb03f608a32d', 'mention', NOW()),
  ('8064861c-749d-42ad-8d6f-fb03f608a32d', 2, NULL, '8064861c-749d-42ad-8d6f-fb03f608a32d', 'review', NOW());