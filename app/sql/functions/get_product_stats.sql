CREATE OR REPLACE FUNCTION get_product_stats(product_id text)
RETURNS TABLE (
    product_views bigint,
    product_clicks bigint,
    month text
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        SUM(CASE WHEN event_type = 'product_view' THEN 1 ELSE 0 END) AS product_views,
        SUM(CASE WHEN event_type = 'product_click' THEN 1 ELSE 0 END) AS product_clicks,
        to_char(created_at, 'YYYY-MM') AS month
    FROM
        public.events
    WHERE
        event_data ->> 'product_id' = product_id
    GROUP BY month;
END;
$$ LANGUAGE plpgsql;