# 数据库相关

## 基本概念

DB：database，数据库。DB 是通过 DBMS 创建和操作的容器。  
DBMS：数据库管理系统，即数据库软件，用于管理 DB 中的数据。比如 MySQL、Oracle、DB2、MongoDB……  
SQL：结构化查询语言，用来操作数据库，与数据库通信的语言。  
关系型：MySQL、Oracle、SQL Server 等，关系型数据库是将数据存放在表中(?)  
非关系型(NoSQL)：Redis、MongoDB 等，存放在文档中(?)  
如：MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

## 初识 SQL

1、启用和停止：可以通过任务管理器或者 cmd(管理员身份)输入 net start/stop mysql(自己数据库名字)  
2、SQL 基本概念：一个关系即一个表, 一个元组即一行, 一个属性即一列  
3、SQL 基本语法 略 [主键和外键](https://www.cnblogs.com/lrhya/p/12534561.html)  
4、例题：  
数据库中两张表 tab1、tab2，tab1 中有字段：id、name，tab2 中有字段：id、score、class，两张表以 id 字段作为外键关联，用一个 sql 语句找到名字为“navi”的人对应的班级和分数？

```sql
select score,class from tab2 where id =(select id from tab1 where name="navi");
-- sql里大小写无所谓
-- select from 是数据库里的查询语法
```

5、[三范式](https://www.cnblogs.com/linjiqin/archive/2012/04/01/2428695.html)  
第一范式(确保每列保持原子性), 所有字段值都是不可分解的原子值  
第二范式(确保表中的每列都和主键相关)  
第三范式(确保每列都和主键列直接相关,而不是间接相关)

## MongoDB

### 语法对比

SQL: 表、行、列、主键  
对应着：  
Mongo: 集合、文档、字段、对象 ID

### 操作

1、数据库操作  
创建数据库: use demo  
查看数据库: show dbs  
删除数据库: db.dropDatabase()
2、集合操作  
创建集合: db.createCollection(name)  
查看集合: show collections  
删除集合: db.collection.drop()
3、文档(行)操作:  
创建、查看、删除、更新等等

# 计算机组成原理

讲什么：计算机硬件逻辑实现  
1、基本部件的结构和组织方式  
2、基本运算的操作原理  
3、基本部件和单元的设计思想
