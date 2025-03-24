import { ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/common/components/ui/card";
import { Link, useParams } from "react-router";

interface CategoryCardProps {
  id: number;
  title: string;
  description: string;
}

export function CategoryCard({
  id,
  title,
  description,
}: CategoryCardProps) {
  return (
    <Link to={`/products/categories/${id}`} className="block">
      <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            <ChevronRightIcon className="size-6" />
          </CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
