import { Form } from "react-router";
import { Route } from "./+types/team-page";
import Hero from "~/common/components/hero";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { getTeamById } from "../queries-teams";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    {
      title: "팀 페이지 | writenow",
    },
  ];
};

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const team = await getTeamById(client, Number(params.teamId));
  return { team };
};

export default function TeamPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={`${loaderData.team.product_name}팀에 합류하기`}
        subtitle={`${loaderData.team.product_name}팀에 합류하기 위한 자기소개를 작성해주세요.`}
      />
      <div className="grid grid-cols-6 gap-10 items-start">
        <main className=" col-span-4 grid grid-cols-4 gap-5">
          {[
            {
              title: "팀 이름",
              value: loaderData.team.product_name,
            },
            {
              title: "팀 인원",
              value: loaderData.team.team_size,
            },
            {
              title: "모집 포지션",
              value: loaderData.team.roles,
            },
            {
              title: "지분 분배",
              value: `${loaderData.team.equity_split}%`,
            },
          ].map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-edium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 text-2xl font-bold">
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-edium text-muted-foreground">
                찾는 일자리
              </CardTitle>
              <CardContent className="p-0 text-xl font-bold flex flex-wrap gap-2">
                <ul className="list-disc list-inside">
                  {loaderData.team.roles
                    .split(",")
                    .map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-edium text-muted-foreground">
                프로젝트 아이디어
              </CardTitle>
              <CardContent className="p-0 text-xl font-bold flex flex-wrap gap-2">
                <p>{loaderData.team.product_description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </main>
        <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-5">
          <div className="flex  gap-5">
            {/* 게시물 작성자 */}
            <Avatar className="size-12">
              <AvatarFallback>
                {loaderData.team.team_leader.name[0]}
              </AvatarFallback>
              <AvatarImage
                src={loaderData.team.team_leader.avatar ?? ""}
              />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">
                {loaderData.team.team_leader.name}
              </h4>
              <Badge variant="default" className="w-fit">
                {loaderData.team.team_leader.role}
              </Badge>
            </div>
          </div>
          <Form className="flex flex-col gap-5 clear-start">
            <InputPair
              label="자기소개 해주세요"
              description={`${loaderData.team.product_name}팀에 합류하기 위한 자기소개를 작성해주세요.`}
              id="introduction"
              name="introduction"
              placeholder="자기소개를 입력해주세요."
              required
              textarea
            />

            <Button type="submit" className="w-full">
              연락하기
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
