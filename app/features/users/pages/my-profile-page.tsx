import { redirect } from "react-router";

export function loader() {
	// find user using the cookies
	return redirect("/users/krischoo");
	//krischoo 부분은 나중에 쿠키에서 가져옴
}
