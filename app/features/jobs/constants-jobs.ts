export const JOB_TYPES = [
	{
		label: "Full-time",
		value: "full-time",
	},
	{
		label: "Part-time",
		value: "part-time",
	},
	{
		label: "Remote",
		value: "remote",
	},
	{
		label: "Internship",
		value: "internship",
	},
	{
		label: "Freelance",
		value: "freelance",
	},
] as const;

export const LOCATION_TYPES = [
	{
		label: "Remote",
		value: "remote",
	},
	{
		label: "In-person",
		value: "in-person",
	},
	{
		label: "Hybrid",
		value: "hybrid",
	},
] as const;

export const SALARY_RANGE = [
	"3천만원 미만",
	"3천만원 ~ 5천만원",
	"5천만원 ~ 7천만원",
	"7천만원 ~ 1억원",
	"1억원 이상",
] as const;
