DROP PROCEDURE IF EXISTS `upsert_customer_preferences`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `upsert_customer_preferences`(IN inCustomerId INT,
  IN inCommunityId INT, IN inLanguageCode VARCHAR(10))
BEGIN
  INSERT INTO preferences (customer_id, community_id, language_code) VALUES (inCustomerId, inCommunityId, inLanguageCode)
  ON DUPLICATE KEY UPDATE community_id = inCommunityId, language_code = inLanguageCode;

  SELECT p.*, c.community_name FROM preferences p INNER JOIN community c on c.community_id = p.community_id where p.customer_id = inCustomerId;
END ;;
DELIMITER ;