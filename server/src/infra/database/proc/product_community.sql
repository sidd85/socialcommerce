DROP PROCEDURE IF EXISTS `catalog_get_products_in_community`;
DROP PROCEDURE IF EXISTS `catalog_count_products_in_community`;
DROP PROCEDURE IF EXISTS `catalog_get_products_by_category_and_community`;
DROP PROCEDURE IF EXISTS `catalog_count_products_by_category_and_community`;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `catalog_get_products_in_community`(
  IN inCommunityId INT, IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  -- Prepare statement
  PREPARE statement FROM
   "SELECT     p.product_id, p.name,
               IF(LENGTH(p.description) <= ?,
                  p.description,
                  CONCAT(LEFT(p.description, ?),
                         '...')) AS description,
               p.price, p.discounted_price, p.thumbnail
    FROM       product p
    INNER JOIN product_community pc
                 ON p.product_id = pc.product_id
    WHERE      pc.community_id = ?
    ORDER BY   p.display DESC
    LIMIT      ?, ?";

  -- Define query parameters
  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inCommunityId;
  SET @p4 = inStartItem;
  SET @p5 = inProductsPerPage;

  -- Execute the statement
  EXECUTE statement USING @p1, @p2, @p3, @p4, @p5;
END $$
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `catalog_count_products_in_community`(IN inCommunityId INT)
BEGIN
  SELECT     COUNT(*) AS communities_count
  FROM       product p
  INNER JOIN product_community pc
               ON p.product_id = pc.product_id
  WHERE      pc.community_id = inCommunityId;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `catalog_get_products_by_category_and_community`(
  IN inCategoryId INT,
  IN inCommunityId INT, IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  -- Prepare statement
  PREPARE statement FROM
   "SELECT     p.product_id, p.name,
               IF(LENGTH(p.description) <= ?,
                  p.description,
                  CONCAT(LEFT(p.description, ?),
                         '...')) AS description,
               p.price, p.discounted_price, p.thumbnail
    FROM       product p
    INNER JOIN product_community pc ON p.product_id = pc.product_id
    INNER JOIN product_category pcat ON pcat.product_id = p.product_id
    WHERE      pc.community_id = ? AND pcat.category_id = ?
    ORDER BY   p.display DESC
    LIMIT      ?, ?";

  -- Define query parameters
  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inCommunityId;
  SET @p4 = inCategoryId;
  SET @p5 = inStartItem;
  SET @p6 = inProductsPerPage;

  -- Execute the statement
  EXECUTE statement USING @p1, @p2, @p3, @p4, @p5, @p6;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `catalog_count_products_by_category_and_community`(IN inCategoryId INT, IN inCommunityId INT)
BEGIN
  SELECT     COUNT(*) AS communities_count
  FROM       product p
  INNER JOIN product_community pc ON p.product_id = pc.product_id
  INNER JOIN product_category pcat ON pcat.product_id = p.product_id
  WHERE      pc.community_id = inCommunityId AND pcat.category_id = inCategoryId;
END ;;
DELIMITER ;


