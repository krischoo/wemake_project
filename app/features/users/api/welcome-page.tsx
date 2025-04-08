import { Resend } from "resend";
import { Route } from "./+types/welcome-page";
import WelcomeUser from "react-email-starter/emails/welcome-user";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { data, error } = await client.emails.send({
    from: "KRIS <kris@mail.linkey.us>",
    to: ["seokhunk@gmail.com"],
    subject: "Welcome to Linkey",
    react: <WelcomeUser username={params.username} />,
  });
  return Response.json({ data, error });
};
