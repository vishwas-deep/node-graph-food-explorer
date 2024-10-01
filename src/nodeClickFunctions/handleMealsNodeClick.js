export const handleMealsNodeClick  = (node, nodes, edges, setNodes, setEdges) => {
    // Filter out previous option nodes for meals
    const filteredNodes = nodes.filter(elem => !elem.id.startsWith('ingredient-') && !elem.id.startsWith('tag-') && !elem.id.startsWith('details-') && !elem.id.startsWith('ingredientNode-') && !elem.id.startsWith('tagNode-'));
    const filteredEdges = edges.filter(elem => !elem.id.startsWith('edge-ingredient-') && !elem.id.startsWith('edge-tag-') && !elem.id.startsWith('edge-details-') && !elem.id.startsWith('edge-tagNode-') && !elem.id.startsWith('edge-ingredientNode-') );

    setNodes(filteredNodes);
    setEdges(filteredEdges);

    // Create "View Ingredients" option node
    const viewIngredientsNode = {
      id: `ingredient-${node.id}`,
      data: { label: 'View Ingredients' },
      position: { x: 1100, y: -300 }, // Set position for Ingredients node
    };

    // Create "View Tags" option node
    const viewTagsNode = {
      id: `tag-${node.id}`,
      data: { label: 'View Tags' },
      position: { x: 1100, y: -250 }, // Set position for Tags node
    };

    // Create "View Details" option node
    const viewDetailsNode = {
      id: `details-${node.id}`,
      data: { label: 'View Details' },
      position: { x: 1100, y: -200 }, // Set position for Details node
    };

    // Update nodes
    setNodes(prev => [...prev, viewIngredientsNode, viewTagsNode, viewDetailsNode]);

    // Create edges for the new option nodes
    const viewIngredientsEdge = {
      id: `edge-ingredient-${node.id}`,
      source: node.id,
      target: `ingredient-${node.id}`,
      type: 'simplebezier',
    };

    const viewTagsEdge = {
      id: `edge-tag-${node.id}`,
      source: node.id,
      target: `tag-${node.id}`,
      type: 'simplebezier',
    };

    const viewDetailsEdge = {
      id: `edge-details-${node.id}`,
      source: node.id,
      target: `details-${node.id}`,
      type: 'simplebezier',
    };

    // Update edges
    setEdges(prev => [...prev, viewIngredientsEdge, viewTagsEdge, viewDetailsEdge]);
}