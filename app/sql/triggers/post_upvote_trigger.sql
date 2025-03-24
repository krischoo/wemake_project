CREATE FUNCTION public.handle_post_upvote()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.posts SET upvotes = upvotes + 1 WHERE post_id = NEW.post_id;
    RETURN NEW;
END;
$$;

CREATE TRIGGER handle_post_upvote
AFTER INSERT ON public.post_upvotes
FOR EACH ROW EXECUTE PROCEDURE public.handle_post_upvote();

-------

CREATE FUNCTION public.handle_post_unvote()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.posts SET upvotes = upvotes - 1 WHERE post_id = OLD.post_id;
    RETURN OLD;
END;
$$;

CREATE TRIGGER handle_post_unvote
AFTER DELETE ON public.post_upvotes
FOR EACH ROW EXECUTE PROCEDURE public.handle_post_unvote();