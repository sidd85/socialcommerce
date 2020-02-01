DROP PROCEDURE IF EXISTS shopping_cart_add_product_v2;
DROP PROCEDURE IF EXISTS shopping_cart_get_products_v2;
DROP PROCEDURE IF EXISTS shopping_cart_update_product_quantity_v2;
DROP PROCEDURE IF EXISTS shopping_cart_remove_product_v2;
DROP PROCEDURE IF EXISTS shopping_cart_empty_v2;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopping_cart_add_product_v2`(IN inProductId INT, IN inCustomerId INT, IN inCommunityId INT)
BEGIN
  DECLARE productQuantity INT;
  DECLARE cartUID TEXT;
  -- Obtain current shopping cart quantity for the product
  SELECT DISTINCT quantity
  FROM   shopping_cart
  WHERE  product_id = inProductId
         AND customer_id = inCustomerId AND active = true
  INTO   productQuantity;

  SELECT DISTINCT cart_id
  FROM   shopping_cart
  WHERE  customer_id = inCustomerId AND active = true
  INTO   cartUID;

  -- Create new shopping cart record, or increase quantity of existing record
  IF productQuantity IS NULL THEN
    INSERT INTO shopping_cart(cart_id, product_id,
                              quantity, added_on, customer_id, community_id)
           VALUES (COALESCE(cartUID, UUID()), inProductId, 1, NOW(), inCustomerId, inCommunityId);
  ELSE
    UPDATE shopping_cart
    SET    quantity = productQuantity + 1
    WHERE  cart_id = COALESCE(cartUID, UUID())
           AND product_id = inProductId
           AND customer_id = inCustomerId
           AND active = true;
  END IF;
END$$
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopping_cart_get_products_v2`(IN inCustomerId INT)
BEGIN
  SELECT     sc.item_id, p.name, p.product_id, p.thumbnail, sc.attributes, sc.cart_id, sc.community_id, 
			 p.price as originalprice, 
			 COALESCE(NULLIF(p.discounted_price, 0), p.price) AS price,
             sc.quantity,
             p.price * sc.quantity AS originaltotal,
             COALESCE(NULLIF(p.discounted_price, 0),
                      p.price) * sc.quantity AS subtotal    
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.customer_id = inCustomerId AND sc.buy_now;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopping_cart_update_product_quantity_v2`(IN inProductId INT, IN inQuantity INT, IN inCustomerId INT)
BEGIN
  IF inQuantity > 0 THEN
    UPDATE shopping_cart
    SET    quantity = inQuantity, added_on = NOW()
    WHERE  product_id = inProductId AND active = true AND customer_id = inCustomerId;
  ELSE
    CALL shopping_cart_remove_product_v2(inProductId, inCustomerId);
  END IF;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopping_cart_remove_product_v2`(IN inProductId INT, IN inCustomerId INT)
BEGIN
  DELETE FROM shopping_cart WHERE product_id = inProductId AND active = true AND customer_id = inCustomerId;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `shopping_cart_empty_v2`(IN inCartId TEXT)
BEGIN
  DELETE FROM shopping_cart WHERE cart_id = inCartId;
END ;;
DELIMITER ;