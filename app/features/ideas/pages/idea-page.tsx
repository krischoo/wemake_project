import { Route } from "./+types/idea-page";
import Hero from "~/common/components/hero";
import { EyeIcon, DotIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
	return [
		{ title: `Idea | WriteNow` },
		{ name: "description", content: "Idea" },
	];
};

export const loader = ({ params }: Route.LoaderArgs) => {
	const { ideaId } = params;
	return { ideaId };
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
	const { ideaId } = loaderData;
	return (
		<div>
			<Hero title={`Idea : ${ideaId}`} />
			<div className="flex flex-col gap-10 items-center max-w-screen-sm mx-auto">
				<p className="italic text-center">
					{/* 나중에 db에서 가져올 예정 */}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
					quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
					amet consectetur adipisicing elit. Quisquam, quos.
				</p>
				<div className="flex gap-2 text-sm">
					<div className="flex items-center gap-2">
						<EyeIcon className="w-4 h-4" />
						<span>100</span>

						<DotIcon className="w-4 h-4" />
						<span>12 hours ago</span>
						<DotIcon className="w-4 h-4" />
						<Button variant="outline" className="text-sm px-2">
							<HeartIcon className="w-4 h-4" />
							<span>100</span>
						</Button>
					</div>
				</div>
				<Button size="lg" className="w-full">
					Claim Idea Now &rarr;
				</Button>
			</div>
		</div>
	);
}
