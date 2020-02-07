DROP PROCEDURE IF EXISTS `customer_add_v2`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `customer_add_v2`(IN inName VARCHAR(50),
  IN inEmail VARCHAR(100), IN inPhone VARCHAR(100), IN inPassword VARCHAR(100))
BEGIN
  INSERT INTO customer (name, email, mob_phone, password)
         VALUES (inName, inEmail, inPhone, inPassword);

  SELECT LAST_INSERT_ID();
END ;;
DELIMITER ;