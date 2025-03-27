ALTER TABLE "reviews" RENAME TO "product_reviews";--> statement-breakpoint
ALTER TABLE "product_reviews" DROP CONSTRAINT "rating_check";--> statement-breakpoint
ALTER TABLE "product_reviews" DROP CONSTRAINT "reviews_product_id_products_product_id_fk";
--> statement-breakpoint
ALTER TABLE "product_reviews" DROP CONSTRAINT "reviews_profile_id_profiles_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "product_reviews" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_reviews" ALTER COLUMN "profile_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_reviews" ADD CONSTRAINT "rating_check" CHECK ("product_reviews"."rating" BETWEEN 1 AND 5);