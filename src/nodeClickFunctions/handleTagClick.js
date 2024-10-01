import { fetchIngredientsByMealId } from "../API";

export const handleTagClick  = async (node, nodes, edges, setNodes, setEdges) => {
    // Filter out previous option nodes for tags
    const filteredNodes = nodes.filter(elem => !elem.id.startsWith('tagNode-'));
    const filteredEdges = edges.filter(elem => !elem.id.startsWith('edge-tagNode-'));

    setNodes(filteredNodes);
    setEdges(filteredEdges);

    // Handle View Tags node click
    const mealId = node.id.slice(-5); 
    const data = await fetchIngredientsByMealId(mealId); 

    const tagsArray = data?.strTags ? data.strTags.split(',') : []; 

    // Create tag nodes
    const tagNodes = tagsArray?.map((tag, index) => ({
      id: `tagNode-${tag}`,
      data: {
        label: tag,
      },
      position: { x: 1300, y: -300 + (index + 1) * 50 },
    }));

    
    setNodes(prev => [...prev, ...tagNodes]);

    // Create edges for tag nodes
    const tagEdges = tagsArray?.map(tag => ({
      id: `edge-tagNode-${tag}`,
      source: node.id,
      target: `tagNode-${tag}`,
      type: 'simplebezier',
    }));

    // Set edges for tag nodes
    setEdges(prev => [...prev, ...tagEdges]);
}