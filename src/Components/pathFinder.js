import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import "./pathFinder.css";
import { dijkstra,getNodesInShortestPathOrder } from "./algo/algorithm";
// const start_node_row = 10;
// const start_node_col = 15;
// const end_node_row = 10;
// const end_node_col = 45;

function PathFinder() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  useEffect(() => {
    const grid = createGrid();
    setGrid(grid);
  }, []);
  
//write handlemousedown function
const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
};
//write handleMouseEnter function
const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
};

//write handleMouseUp function
const handleMouseUp = () => {
    setMouseIsPressed(false);
};

const animateDijkstra = (visitedNodesInOrder,nodesInShortestPathOrder) => {
  if(visitedNodesInOrder[visitedNodesInOrder.length-1].path===false){ 
    alert("No Path Found");
    return;
}

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

 const animateShortestPath =(nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

//write vsualiseDijkstra function
const visualiseDijkstra = () => {
    const startNode = grid[0][0];
    const endNode = grid[18][40];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    //console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder);
};



  return (
    <div className="grid">
      {/*loop through the grid and create nodes*/}
      {/*create a button to initaialize dijktra function*/}
        <button className='btn' onClick={() => visualiseDijkstra()}>Visualize Dijkstra's Algorithm</button>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
          {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall} = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
                  row={row}
                  />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

//write a function to create a 2d grid
const createGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const arr = [];
    for (let col = 0; col < 50; col++) {
      const createNode = {
        row,
        col,
        isStart: row === 0 && col === 0,
        isFinish: row === 18 && col === 40,
        isWall:false,
        isVisited: false,
        previousNode: null,
        distance: Infinity,
      };
      arr.push(createNode);
    }
    grid.push(arr);
  }
  return grid;
};

//write a function to get the new grid with the updated wall
 const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

export default PathFinder;
