# 웹사이트 라우트 구조

이 문서는 웹사이트의 모든 URL 경로와 해당 경로에서 로드되는 페이지 파일을 표 형식으로 정리한 것입니다.

## 용어 설명

- `index`: 해당 경로의 기본 페이지 (예: "/")
- `route`: 특정 경로와 연결된 페이지
- `prefix`: 여러 경로에 공통된 접두사를 적용 (하위 경로들을 그룹화)
- `:param`: URL에서 동적으로 변하는 파라미터 부분 (예: `:year`, `:month` 등)

## 라우트 구조 테이블

| 번호 | URL 경로                                         | 연결된 파일                                                 | 비고                                          |
| ---- | ------------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------- |
| 1    | `/`                                              | `common/pages/home-page.tsx`                                | 홈페이지                                      |
| 2    | `/products`                                      | `features/products/pages/products-page.tsx`                 | 제품 메인 페이지                              |
| 3    | `/products/leaderboards`                         | `features/products/pages/leaderboard-page.tsx`              | 리더보드 메인 페이지                          |
| 4    | `/products/leaderboards/yearly/:year`            | `features/products/pages/yearly-leaderboard-page.tsx`       | 예: `/products/leaderboards/yearly/2023`      |
| 5    | `/products/leaderboards/monthly/:year/:month`    | `features/products/pages/monthly-leaderboard-page.tsx`      | 예: `/products/leaderboards/monthly/2023/12`  |
| 6    | `/products/leaderboards/weekly/:year/:week`      | `features/products/pages/weekly-leaderboard-page.tsx`       | 예: `/products/leaderboards/weekly/2023/52`   |
| 7    | `/products/leaderboards/daily/:year/:month/:day` | `features/products/pages/daily-leaderboard-page.tsx`        | 예: `/products/leaderboards/daily/2023/12/31` |
| 8    | `/products/leaderboards/:period`                 | `features/products/pages/leaderboards-redirection-page.tsx` | 예: `/products/leaderboards/trending`         |
| 9    | `/products/categories`                           | `features/products/pages/categories-page.tsx`               | 카테고리 메인 페이지                          |
| 10   | `/products/categories/:category`                 | `features/products/pages/category-page.tsx`                 | 예: `/products/categories/technology`         |
| 11   | `/products/search`                               | `features/products/pages/search-page.tsx`                   | 검색 페이지                                   |
| 12   | `/products/submit`                               | `features/products/pages/submit-page.tsx`                   | 제품 제출 페이지                              |
| 13   | `/products/promote`                              | `features/products/pages/promote-page.tsx`                  | 제품 홍보 페이지                              |
| 14   | `/test`                                          | `common/pages/test-page.tsx`                                | 테스트 페이지                                 |

## prefix 기능 설명

`...prefix("경로", [라우트들])` 구문은 여러 라우트에 공통 경로를 적용하는 방법입니다.

예시로 코드에서는 다음과 같이 구현되어 있습니다:

```typescript
...prefix("products", [
  index("features/products/pages/products-page.tsx"),
  ...prefix("leaderboards", [...]),
  ...prefix("categories", [...]),
  route("/search", "features/products/pages/search-page.tsx"),
  route("/submit", "features/products/pages/submit-page.tsx"),
  route("/promote", "features/products/pages/promote-page.tsx"),
])
```

이렇게 하면 모든 내부 경로에 자동으로 `/products` 접두사가 추가됩니다.
