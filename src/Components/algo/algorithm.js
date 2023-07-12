import { Heap } from 'heap-js';


//write dikshtra's algorithm using priority queue with given grid and start node
export const dijkstra = (grid, startNode, endNode) => {
  const priorityQueue = new Heap((a, b) => a.distance - b.distance);
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    priorityQueue.push(startNode);
    while (!priorityQueue.isEmpty()) {
        const closestNode = priorityQueue.peek();
        priorityQueue.pop();
        closestNode.isVisited = true;
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        //console.log(closestNode);
        visitedNodesInOrder.push(closestNode);
        if (closestNode === endNode) return visitedNodesInOrder;
        //updateUnvisitedNeighbors(closestNode, grid);
        const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
        for (const neighbor of unvisitedNeighbors) {
          if(neighbor.isWall) continue;
          else if(neighbor.isVisited) continue;
          else if(closestNode.distance + 1 < neighbor.distance){
                neighbor.distance = closestNode.distance + 1;
                neighbor.previousNode = closestNode;
                priorityQueue.push(neighbor);
          }
        }
    }
     const dummyNode={
        row:0,
        col:0,
        isStart: false,
        isFinish: false,
        isWall:false,
        isVisited: false,
        previousNode: null,
        distance: 0,
        path: false,
      }
      visitedNodesInOrder.push(dummyNode);
      return visitedNodesInOrder;
}

//write a function to update the unvisited neighbors of the given node
// const updateUnvisitedNeighbors = (node, grid) => {
//     const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//     for (const neighbor of unvisitedNeighbors) {
//             neighbor.distance = node.distance + 1;
//             neighbor.previousNode = node;
//             priorityQueue.push(neighbor);
//     }
// }

//write a function to get the unvisited neighbors of the given node

 const  getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

//write getNodesInShortestPathOrder function
export const getNodesInShortestPathOrder = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
};