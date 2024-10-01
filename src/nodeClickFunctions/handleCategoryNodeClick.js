export const handleCategoryNodeClick = (node, nodes, edges, setNodes, setEdges) => {
    
      // Filter out previous meal nodes and edges
      const filteredNodes = nodes.filter(elem => !elem.id.startsWith('meal-') && !elem.id.startsWith('viewMeals-') && !elem.id.startsWith('ingredient-') && !elem.id.startsWith('tag-') && !elem.id.startsWith('details-') && !elem.id.startsWith('ingredientNode-'));
      const filteredEdges = edges.filter(elem => !elem.id.startsWith('edge-meal-') && !elem.id.startsWith('edge-viewMeals-') && !elem.id.startsWith('edge-ingredient-') && !elem.id.startsWith('edge-tag-') && !elem.id.startsWith('edge-details-') && !elem.id.startsWith('edge-ingredientNode-'));

      setNodes(filteredNodes);
      setEdges(filteredEdges);

      // Create a "View Meals" option node
      const viewMealsNode = {
        id: `viewMeals-${node.id}`,
        data: { label: <span>View Meals</span> },
        position: { x: 600, y: -300 + Math.random() * 100 }, // Random y position for layout
      };
      setNodes(prev => [...prev, viewMealsNode]);

      // Create an edge from the category to the "View Meals" node
      const viewMealsEdge = {
        id: `edge-viewMeals-${node.id}`,
        source: node.id,
        target: `viewMeals-${node.id}`,
        type: 'simplebezier',
      };
      setEdges(prev => [...prev, viewMealsEdge]);
}