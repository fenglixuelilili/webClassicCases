// 树的定义
// 根 root 
// 子树 subtree
// 节点node 树中的元素
// 双亲 parent 一个节点有子树  子树的根为改节点的孩子
// 叶子 leaf 度为0的节点
// 层次 level


//  一颗深度为k 且有2^k -1 个节点的树 为满二叉树
// 具有n个节点的完全二叉树的深度为floor(log2n) + 1
// 在二叉树的第i层，上最多有2^(i-1) 节点


// n叉树 每个节点至少访问 n + 1 次
// 深度优先遍历  DFS
// 1.前序遍历  就是在DFS在第一次遇到节点时进行处理
function preorderTraversal(node, result = [] ) {
    if( node ) {
      // 先根节点
      result.push(node.value)
      // 遍历左子树
      preorderTraversal( node.left, result )
      // 遍历右子树
      preorderTraversal( node.right, result )
    }
    return result
}
// 中序遍历
function inorderTraversal(node, result = [] ) {
  if( node ) {
    // 遍历左子树
    inorderTraversal( node.left, result )

    // 根节点
    result.push(node.value)
    
    // 遍历右子树
    inorderTraversal( node.right, result )
  }
  return result
}
// 后续遍历
function lastTraversal(node, result = [] ) {
  if( node ) {
    // 遍历左子树
    lastTraversal( node.left, result )
    //  
    lastTraversal( node.right, result )
    // 根节点
    result.push(node.value)
  }
  return result
}



// 广度优先 BFS 就是横向遍历
function  BFSLevelOrder(root) {
  const ret = []
  if(!root) return ret

  const q = []
  q.push(root)
  while(q.length !== 0){
    const currentLevelSize = q.length
    ret.push([])
    for( let i = 1; i < currentLevelSize; i++ ) {
      const node = q.shift()
      ret[ret.length-1].push(node.value)
      if( node.left ){
        q.push( node.left )
      }
      if( node.right ){
        q.push( node.right )
      }
    }
  }
  return ret
}


// 计算树的高度
function  maxDeep(root) {
  if(!root) return 0
  if( !root.left && !root.right ) return 1
  return Math.max( maxDeep(root.left) + maxDeep(root.right) ) + 1
}

// 反转二叉树
function inverTree(root) {
  if( !root || ( !root.left && !root.right ) ) return root
  root.left = inverTree(root.left)
  root.right = inverTree(root.right)
  return exchangeChildNode(root)
}
//交换树的方法
function exchangeChildNode( ndoe ) {
  let tmep = null
  tmep = node.left
  node.left = node.right
  node.right = tmep
  return node
}