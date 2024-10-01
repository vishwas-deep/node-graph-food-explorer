import React, { useCallback, useState } from 'react'
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow'
import 'reactflow/dist/style.css';
import MealDetailsSidebar from './MealDetailsSidebar';
import { handleParentNodeClick } from './nodeClickFunctions/handleParentNodeClick';
import { handleCategoryNodeClick } from './nodeClickFunctions/handleCategoryNodeClick';
import { handleViewMealsClick } from './nodeClickFunctions/handleViewMealsClick';
import { handleMealsNodeClick } from './nodeClickFunctions/handleMealsNodeClick';
import { handleIngredientClick } from './nodeClickFunctions/handleIngredientClick';
import { handleTagClick } from './nodeClickFunctions/handleTagClick';
import { handleDetailsClick } from './nodeClickFunctions/handleDetailsClick';

const App = () => {

  const [nodes, setNodes] = useState([
    {
      id: '1',
      data: { label: 'Explore' },
      position: { x: 0, y: 0 },
      type: 'input',
    },
  ]);
  const [edges, setEdges] = useState([]);

  const [mealDetails, setMealDetails] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
    setMealDetails(null); // Clear meal details when closing
  };

  const handleNodeClick = async (event, node) => {
    if (node.id === '1') {
      handleParentNodeClick(node, nodes, edges, setNodes, setEdges);
    } else if (node.id.startsWith('category-')) {
      handleCategoryNodeClick(node, nodes, edges, setNodes, setEdges);
    } else if (node.id.startsWith('viewMeals-')) {
      handleViewMealsClick(node, nodes, edges, setNodes, setEdges);
    } else if (node.id.startsWith('meal-')) {
      handleMealsNodeClick(node, nodes, edges, setNodes, setEdges);
    } else if (node.id.startsWith('ingredient-')) {
      handleIngredientClick(node, nodes, edges, setNodes, setEdges);
    } else if (node.id.startsWith('tag-')) {
      handleTagClick(node, nodes, edges, setNodes, setEdges);
    } else if (node.id.startsWith('details-')) {
      handleDetailsClick(node, nodes, edges, setNodes, setEdges, setMealDetails, setSidebarOpen)
    }

  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <>
      {sidebarOpen && (
        <MealDetailsSidebar mealDetails={mealDetails} onClose={closeSidebar} />
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </>

  )
}

export default App;