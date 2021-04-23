## 算法algorithm
## 力扣篇
1、 [220.存在重复元素 III](https://leetcode-cn.com/problems/contains-duplicate-iii/)0417每日一题x
桶排序做法 O(n)时间复杂度
结合桶排序+计数排序+基数排序 进行总结  
此系列还有 存在重复元素 + 存在重复元素II 方法不同 可用set存储  
  
2、27.移除元素 + 80.删除有序数组中的重复项 II + 26.删除有序数组中的重复项  
法一、splice从后往前遍历  
法二、双指针做法  
  
3、背包问题  
①01背包，01指的是对此物品拿或不拿，且每个物体只能选一次  
题目：  
[牛客：01背包原型](https://www.nowcoder.com/practice/2820ea076d144b30806e72de5e5d4bbf?tpId=188&tqId=38312&rp=1&ru=%2Factivity%2Foj&qru=%2Fta%2Fjob-code-high-week%2Fquestion-ranking&tab=answerKey)  二维dp  进阶做法：滚动数组降为一维  

```javascript
//已知一个背包最多能容纳物体的体积为V
//现有n个物品第i个物品的体积为v_i,第i个物品的重量为w_i
//求当前背包最多能装多大重量的物品
//输入：背包体积10,物品个数2,物品为[[1,3],[10,4]]一维是体积 二维是重量  输出：4
function knapsack( V ,  n ,  vw ) {
  const dp = new Array(V + 1).fill(0).map(item => new Array(n + 1).fill(0));
  // dp[i][j]表示体积为背包最大为i时，对于第j个物体的选取情况
  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      if (i - vw[j - 1][0] < 0) {
        dp[i][j] = dp[i][j - 1]
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - vw[j - 1][0]][j - 1] + vw[j - 1][1])
      }
    }
  }
  return dp[V][n]
}
```
力扣：分割等和子集、最后一块石头的重量II、目标和、一和零  
  
②完全背包，每个元素可以多次选取。力扣 零钱兑换I II + 组合总和Ⅳ  
[背包技巧](https://leetcode-cn.com/problems/combination-sum-iv/solution/xi-wang-yong-yi-chong-gui-lu-gao-ding-bei-bao-wen-/)  
注意内外for循环的参照物以及内层循环的正序倒序问题  

## 前端高频篇
### 1、hex与RGB转化