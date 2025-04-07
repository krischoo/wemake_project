import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import {
  Form,
  Link,
  useActionData,
  useOutletContext,
} from "react-router";
import { useEffect, useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";

import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries-profiles";
import { z } from "zod";
import { createReply } from "../mutations-community";
import { action } from "../pages/post-page";

interface ReplyProps {
  name: string;
  username: string;
  avatarUrl: string | null;
  content: string;
  postedAt: string;
  topLevel: boolean;
  parentId: number;
  childReplies?: Array<{
    reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
  } | null>;
}

const formSchema = z.object({
  reply: z.string().min(1),
});

export default function Reply({
  name,
  username,
  avatarUrl,
  content,
  postedAt,
  parentId,
  topLevel,
  childReplies,
}: ReplyProps) {
  const actionData = useActionData<typeof action>();
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  const {
    isLoggedIn,
    avatar,
    name: loggedInName,
    username: loggedInUsername,
  } = useOutletContext<{
    isLoggedIn: boolean;
    name: string;
    username: string;
    avatar: string | null;
  }>();

  useEffect(() => {
    if (actionData?.success) {
      setReplying(false);
    }
  }, [actionData]);
  return (
    <div className="flex flex-col gap-4">
      {/* 댓글 컨텐츠 목록*/}
      <div className="flex gap-4 items-start">
        <Avatar className="size-16">
          <AvatarFallback>{name[0]}</AvatarFallback>
          {avatarUrl && <AvatarImage src={avatarUrl} />}
        </Avatar>
        <div className="space-y-2 flex flex-col w-full">
          <div className="flex gap-2 items-center">
            <Link to={`/users/${username}`}>
              <h4 className="text-lg font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">
              {DateTime.fromISO(postedAt).toRelative()}
            </span>
          </div>

          {/* 댓글 내용 */}
          <div>
            <p>{content}</p>
          </div>
          {isLoggedIn && (
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2 self-end"
              onClick={toggleReplying}
            >
              <MessageCircleIcon />
              답글 달기
            </Button>
          )}
        </div>
      </div>

      {replying && (
        <section className="flex gap-2 w-full">
          <Avatar className="size-12">
            <AvatarFallback>{loggedInName[0]}</AvatarFallback>
            {avatar && <AvatarImage src={avatar} />}
          </Avatar>

          {/* 대댓글 작성 폼 */}
          <Form
            method="post"
            className="flex flex-col gap-2 w-full items-end"
          >
            <input type="hidden" name="parentId" value={parentId} />
            <Textarea
              name="reply"
              placeholder="댓글을 입력하세요"
              className="resize-none w-full"
              rows={10}
              defaultValue={`@${username} `}
            />
            <Button type="submit">댓글 작성하기</Button>
          </Form>
        </section>
      )}
      {/* 답글의 대댓글 목록 */}
      {topLevel && childReplies && (
        <div className="pl-20 w-full ">
          {childReplies.map(
            (reply) =>
              reply && (
                <Reply
                  key={reply.reply_id}
                  name={reply.user.name}
                  username={reply.user.username}
                  avatarUrl={reply.user.avatar}
                  content={reply.reply}
                  postedAt={reply.created_at}
                  topLevel={false}
                  parentId={parentId}
                />
              )
          )}
        </div>
      )}
    </div>
  );
}
