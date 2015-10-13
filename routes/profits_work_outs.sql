SELECT ID, 
       (SELECT SUM(cost) FROM 2014 WHERE business = ID)
        -(SELECT SUM(cost) FROM 2013 WHERE business = ID) AS diff
FROM business 
GROUP BY ID;


SELECT Product_td.id, 
       (SELECT SUM(Sales_td.qTy * Sales_td.product_price) FROM Sales_td WHERE Product_id = Product_td.id)
        -(SELECT SUM(Purchases_td.qTy * Purchases_td.product_price) FROM Purchases_td WHERE Product_id = Product_td.id) AS Profits
FROM Product_id GROUP BY Product_td.id;


SELECT ID, sum(Sales_td.qTy * Sales_td.product_price)-sum(Purchases_td.qTy * Purchases_td.product_price) as Profits
FROM business 
JOIN Sales_td ON business.ID = Sales_td.business 
JOIN Purchases_td ON business.ID = Purchases_td.business 
GROUP BY ID;

SELECT Sales_td.Product_id, 
SUM(Sales_td.qTy * Sales_td.product_price) 
AS Tot_Earnings_Per_Product, Product_name 
FROM Sales_td 
INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id 
INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id 
group by Product_id;
