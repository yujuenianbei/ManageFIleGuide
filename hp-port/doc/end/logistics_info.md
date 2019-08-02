# 物流表

1. 物流id logisticsId
2. 物流名称 logisticsName
3. 仓库id logisticsEntrepotId
4. 物流联系人 logisticsContactUser
5. 物流联系电话 logisticsContactNumber
6. 配送价格 logisticsCost
7. 创建时间 createTime
8. 更新时间 updateTime




使用eav模型的话


    logistics_e  e_id,  e_name  后面添加一定会有的公共字段
                   1   createTime
                          
    logistics_a  a_id,  a_name
                   1    logisticsName
                   2    logisticsEntrepotId
                   3    logisticsContactUser

    logistics_v  v_id,  e_id,  a_id,  e_a_v
                   1      1      1      顺丰
                   2      1      2      1
                   3      1      3      张三
                   4      2      1      申通
                   5      2      2      2
                   6      2      3      李四
