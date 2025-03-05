import { DateTime } from "luxon";

export default function TestPage() {
	return <>{DateTime.now().setZone("Asia/Seoul").toFormat("yyyy-MM-dd")}</>;
}

export function loader() {
	return null;
}
