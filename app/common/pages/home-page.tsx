import { Link, MetaFunction } from "react-router";

import { Button } from "@/common/components/ui/button";
import { ProductCard } from "@/features/products/components/product-card";

import { PostCard } from "@/features/community/components/post-card";
import { IdeaCard } from "@/features/ideas/components/idea-card";
import { Badge } from "../components/ui/badge";
import { JobCard } from "@/features/jobs/components/job-card";
import { TeamCard } from "@/features/teams/components/team-card";
import { Route } from "./+types/home-page";

export const meta: MetaFunction = () => {
	return [
		{
			title: "Home | writenow",
		},
		{
			name: "description",
			content: "Let's write now",
		},
	];
};

export default function HomePage() {
	return (
		<div className="px-20 space-y-40">
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-snug tracking-tight">
						Today's Products
					</h2>
					<p className="text-m font-light">
						The best products made by writenow today
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/products">View All &rarr;</Link>
					</Button>
				</div>

				{Array.from({ length: 5 }).map((_, index) => (
					<ProductCard
						key={index}
						id={`productid-${index}`}
						name="Product Name"
						description="Product Description"
						commentCount={12}
						viewCount={12}
						upvoteCount={120}
					/>
				))}
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-snug tracking-tight">
						Today's Discussions
					</h2>
					<p className="text-m font-light">
						Discuss the latest products and ideas
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/community">View All &rarr;</Link>
					</Button>
				</div>
				{Array.from({ length: 5 }).map((_, index) => (
					<PostCard
						id="postId"
						title="What is best writing app?"
						author="Kris"
						authorAvatarUrl="https://github.com/apple.png"
						category="Productivity"
						createdAt="2 hours ago"
					/>
				))}
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-snug tracking-tight">
						IdeasGPT
					</h2>
					<p className="text-m font-light">Get ideas from IdeasGPT</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/ideas">Get Ideas &rarr;</Link>
					</Button>
				</div>
				{Array.from({ length: 5 }).map((_, index) => (
					<IdeaCard
						key={`ideaId-${index}`}
						id={`ideaId-${index}`}
						title="AI의 도움을 받아 새로운 제품과 서비스에 대한 아이디어를 발굴하고 검증해보세요. 당신의 아이디어를 더 구체적이고 실현 가능한 형태로 발전시킬 수 있습니다. IdeasGPT는 최신 AI 기술을 활용하여 시장 분석, 사용자 니즈 파악, 비즈니스 모델 구체화까지 도와드립니다. 혁신적인 아이디어가 성공적인 비즈니스로 성장하는 여정을 함께하세요."
						viewCount={100}
						likeCount={100}
						postedAt="12 hours ago"
						claimed={index % 2 === 0}
					/>
				))}
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-snug tracking-tight">
						Latest Jobs
					</h2>
					<p className="text-m font-light">Find your dream job</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/jobs">Get Jobs &rarr;</Link>
					</Button>
				</div>
				{Array.from({ length: 5 }).map((_, index) => (
					<JobCard
						id="jobId"
						company="Tesla"
						companyLogoUrl="https://github.com/facebook.png"
						title="Software Engineer"
						postedAt="12 hours ago"
						type="Full-time"
						positionLocation="Remote"
						companyHq="San Francisco, CA"
						salary="$100,000 - $120,000"
					/>
				))}
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<h2 className="text-2xl font-bold leading-snug tracking-tight">
						Find a team mate
					</h2>
					<p className="text-m font-light">
						Join a team looking for a new member
					</p>
					<Button variant="link" asChild className="text-lg p-0">
						<Link to="/teams">Explore Teams &rarr;</Link>
					</Button>
				</div>
				{Array.from({ length: 5 }).map((_, index) => (
					<TeamCard
						key={`teamId-${index}`}
						id={`teamId-${index}`}
						leaderUsername="Lynn"
						leaderAvatarUrl="https://github.com/inthetiger.png"
						positions={[
							"React Developer",
							"Backend Developer",
							"Product Manager",
						]}
						projectTitle="a new social media platform"
					/>
				))}
			</div>
		</div>
	);
}
