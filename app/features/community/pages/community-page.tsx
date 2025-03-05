import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "@/common/components/post-card";

function CommunityPage() {
	const [searchParams] = useSearchParams();
	const sortBy = searchParams.get("sort") || "default"; // URL에 sort 파라미터가 없으면 'default'

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// sortBy 값에 따라 다른 데이터를 가져옴
		async function fetchPosts() {
			if (sortBy === "top") {
				// 좋아요나 조회수 등으로 정렬된 게시물 가져오기
				const response = await fetch("/api/posts?sort=likes_desc");
				const data = await response.json();
				setPosts(data);
			} else if (sortBy === "new") {
				// 최신 날짜순으로 정렬된 게시물 가져오기
				const response = await fetch("/api/posts?sort=date_desc");
				const data = await response.json();
				setPosts(data);
			}
			// ... 기본 정렬 로직
		}

		fetchPosts();
	}, [sortBy]); // sortBy가 변경될 때마다 실행

	return (
		<div>
			<h1>커뮤니티 게시물</h1>

			{/* 정렬 옵션 선택 UI */}
			<div className="sort-options">
				<Link to="/community">기본</Link>
				<Link to="/community?sort=top">인기순</Link>
				<Link to="/community?sort=new">최신순</Link>
			</div>

			{/* 게시물 목록 표시 */}
			<div className="posts-grid">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}
