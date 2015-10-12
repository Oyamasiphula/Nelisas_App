SELECT   master_table.ORDERNO,
         master_table.ITEM,
         SUM(master_table.QTY),
         stock_bal.BAL_QTY,
         (stock_bal.BAL_QTY - SUM(master_table.QTY)) AS NEW_BAL
FROM     master_table INNER JOIN
         stock_bal ON master_bal.ITEM = stock_bal.ITEM
GROUP BY master_table.ORDERNO,
         master_table.ITEM