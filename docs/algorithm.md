## Algorithm

## ⚡ 力扣篇

### 链表

1、哑节点(dummy Node)：是一个被人为创建的节点，虽然其内容为 NULL，但是它在堆中有占有一定的空间。 哑节点的使用可以避免边界问题的处理，达到简化代码与减少代码出错可能性的目的

<!-- ### 桶排序

[220.存在重复元素 III](https://leetcode-cn.com/problems/contains-duplicate-iii/)0417 每日一题
桶排序做法 O(n)时间复杂度
结合桶排序+计数排序+基数排序 进行总结
此系列还有 存在重复元素 + 存在重复元素 II 方法不同 可用 set 存储 215 TopK 快速选择 -->

### 删除重复元素

27.移除元素 + 80.删除有序数组中的重复项 II + 26.删除有序数组中的重复项  
法一、splice 从后往前遍历  
法二、双指针做法

<!-- ### 背包问题

①01 背包，01 指的是对此物品拿或不拿，且每个物体只能选一次
题目：
[牛客：01 背包原型](https://www.nowcoder.com/practice/2820ea076d144b30806e72de5e5d4bbf?tpId=188&tqId=38312&rp=1&ru=%2Factivity%2Foj&qru=%2Fta%2Fjob-code-high-week%2Fquestion-ranking&tab=answerKey) 二维 dp 进阶做法：滚动数组降为一维

```javascript
// 一般第二个维度表示体积，我这里反着做一下。
//已知一个背包最多能容纳物体的体积为V
//现有n个物品第i个物品的体积为v_i,第i个物品的重量为w_i
//求当前背包最多能装多大重量的物品
//输入：背包体积10,物品个数2,物品为[[1,3],[10,4]]一维是体积 二维是重量  输出：4
function knapsack(V, n, vw) {
  const dp = new Array(V + 1).fill(0).map((item) => new Array(n + 1).fill(0));
  // dp[i][j]表示体积为背包最大为i时，对于第j个物体的选取情况
  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      if (i - vw[j - 1][0] < 0) {
        dp[i][j] = dp[i][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - vw[j - 1][0]][j - 1] + vw[j - 1][1]);
      }
    }
  }
  return dp[V][n];
}
```

力扣：分割等和子集、最后一块石头的重量 II、目标和、一和零

② 完全背包，每个元素可以多次选取。力扣 零钱兑换 I II + 组合总和 Ⅳ
[背包技巧](https://leetcode-cn.com/problems/combination-sum-iv/solution/xi-wang-yong-yi-chong-gui-lu-gao-ding-bei-bao-wen-/)
注意内外 for 循环的参照物以及内层循环的正序倒序问题 -->

### 二分法

**注意边界处理**  
①[704. 二分查找](https://leetcode-cn.com/problems/binary-search/)  
②[1011. 在 D 天内送达包裹的能力](https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days/)  
③[875. 爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas/)  
④[410. 分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)  
⑤[1482. 制作 m 束花所需的最少天数](https://leetcode-cn.com/problems/minimum-number-of-days-to-make-m-bouquets/)

### 双指针

① 链表相关题(快慢指针判断相交)  
②[611. 有效三角形的个数](https://leetcode-cn.com/problems/valid-triangle-number/)  
注意从后往前扫，保证只需要移动一个指针  
③[15. 三数之和](https://leetcode-cn.com/problems/3sum/)  
④[633. 平方数之和](https://leetcode-cn.com/problems/sum-of-square-numbers/)

### 回溯

回溯是 dfs 递归的一种，一般会进行剪枝来优化时间复杂度。  
① 组合排列系列  
② 子集系列  
③[1723. 完成所有工作的最短时间](https://leetcode-cn.com/problems/find-minimum-time-to-finish-all-jobs/)  
④[312. 戳气球](https://leetcode-cn.com/problems/burst-balloons/)(dp 时间复杂度低，回溯比较好想)

### 前缀和

[参考](https://leetcode-cn.com/problems/subarray-sum-equals-k/solution/de-liao-yi-wen-jiang-qian-zhui-he-an-pai-yhyf/)

### 构造栈和队列

对栈的基本操作：  
入栈（push）  
出栈（pop）  
查看栈顶元素（peek，length - 1）  
获取栈的长度（length）  
清空栈（clear）  
判断栈是否空（isEmpty）

对队列的基本操作：  
入队（push）  
出队（shift）  
查看对头元素（peek，0）  
获取队列的长度（length）  
清空队列（clear）  
判断队列是否空（isEmpty）

### 贪心

1、TP-Link 二面——hihocode  
[思路](https://blog.csdn.net/qq_19864679/article/details/113608088?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163222160916780366588531%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=163222160916780366588531&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-113608088.pc_search_result_cache&utm_term=%E8%A1%A5%E6%8F%90%E4%BA%A4%E5%8D%A1++javascript&spm=1018.2226.3001.4187)

```js
const longestDays = (arr, m) => {
  // arr是缺卡日期 m是数组
  // arr = [9, 31, 65];
  if (m >= arr.length) return 100;
  arr.unshift(0);
  arr.push(101);
  let res = 0;
  for (let i = 0; i + m + 1 <= arr.length - 1; i++) {
    res = Math.max(res, arr[i + m + 1] - arr[i] - 1);
  }
  return res;
};
```

## ⚡ 前端高频篇

### hex 与 RGB 转化

## ⚡ 智力题

### 时钟夹角问题

2021 腾讯暑期实习遇到，当时考的比较简单。  
2020CVTE 实习提前批笔试考的是时分秒针夹角的算法。

### 烧绳子问题

[参考](https://mp.weixin.qq.com/s/ZfW406PUKU2Hf3b7BbdWJA)

### 三角形概率

[高中线性规划](https://mp.weixin.qq.com/s/ZfW406PUKU2Hf3b7BbdWJA)

### 灯泡开关

[参考](https://mp.weixin.qq.com/s/GPQ3EqmBLU_kCeKn1Ggyvg)  
首先要知道，100 个灯泡的初始状态都是不一定的。其次，在看完参考答案的三步法后，可以想到，这道题的最优解只需要两步：①、将灯泡变成只有一个是亮的。② 由于成环状围绕，所以剩下 99 个，可以每三个一组变成亮的。

### 1000 杯水

2020 年字节日常实习面试遇到。  
[2\*\*10===1024](https://www.cnblogs.com/catpainter/p/12600448.html)

## 定理公式

1、[同余定理](https://leetcode-cn.com/problems/continuous-subarray-sum/solution/gong-shui-san-xie-tuo-zhan-wei-qiu-fang-1juse/)

## 36 进制

思路和大数之和一致，区别在于需要首先给一个数组存储 36 进制的 10 个数字和 26 个字母用来进行索引。

## KMP

## 2022 下半年每日一题

- [791. 自定义字符串排序](https://leetcode.cn/problems/custom-sort-string/)

```js
const m = new Map([
  ['z', 1],
  ['b', 2],
  ['c', 3],
]);
const arr = ['b', 'c', 'z', 'b'];
arr.sort((a, b) => m.get(a) - m.get(b));
// log ： ['z', 'b', 'b', 'c']

// 不存在的情况：
const arr = ['b', 'c', 'z', 'l', 'b', 'a', 'q'];
arr.sort((a, b) => m.get(a) - m.get(b))(7)[('z', 'b', 'b', 'c', 'l', 'a', 'q')];
// log：['z', 'b', 'b', 'c', 'l', 'a', 'q']
```
