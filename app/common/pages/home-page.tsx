import { Link, MetaFunction } from "react-router";

import { Button } from "@/common/components/ui/button";
import { ProductCard } from "@/features/products/components/product-card";

import { PostCard } from "@/features/community/components/post-card";
import { IdeaCard } from "@/features/ideas/components/idea-card";
import { Badge } from "../components/ui/badge";
import { JobCard } from "@/features/jobs/components/job-card";
import { TeamCard } from "@/features/teams/components/team-card";
import { Route } from "./+types/home-page";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "~/features/products/queries-products";
import { getPosts } from "~/features/community/queries-community";
import { getGptIdeas } from "~/features/ideas/queries-ideas";
import { getJobs } from "~/features/jobs/queries-jobs";
import { getTeams } from "~/features/teams/queries-teams";
import { makeSSRClient } from "~/supa-client";
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

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);

  const [products, posts, ideas, jobs, teams] = await Promise.all([
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }),
    getPosts(client, {
      limit: 5,
      sorting: "newest",
    }),
    getGptIdeas(client, { limit: 10 }),
    getJobs(client, { limit: 10 }),
    getTeams(client, { limit: 10 }),
  ]);

  return { products, posts, ideas, jobs, teams };
};

export default function HomePage({
  loaderData,
}: Route.ComponentProps) {
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
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
        {loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            author={post.author_name}
            authorAvatarUrl={post.author_avatar}
            category={post.topic_name}
            createdAt={post.created_at}
            upvoteCount={post.upvotes}
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
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewCount={idea.views}
            likeCount={idea.likes}
            postedAt={idea.created_at}
            claimed={idea.is_claimed}
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
        {loaderData.jobs.map((job) => (
          <JobCard
            key={job.job_id}
            id={job.job_id}
            company={job.company_name}
            companyLogoUrl={job.company_logo}
            title={job.position}
            postedAt={job.created_at}
            type={job.job_type}
            positionLocation={job.location}
            salary={job.salary_range}
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
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUsername={team.team_leader_id.name}
            leaderAvatarUrl={team.team_leader_id.avatar}
            positions={team.roles.split(",")}
            projectTitle={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
