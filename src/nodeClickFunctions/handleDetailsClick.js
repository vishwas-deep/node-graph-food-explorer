import { fetchIngredientsByMealId } from "../API";

export const handleDetailsClick  = async (node, nodes, edges, setNodes, setEdges, setMealDetails, setSidebarOpen) => {
    // Filter out previous option nodes for details
    const filteredNodes = nodes.filter(elem => !elem.id.startsWith('detailsNode-'));
    const filteredEdges = edges.filter(elem => !elem.id.startsWith('edge-detailsNode-'));

    setNodes(filteredNodes);
    setEdges(filteredEdges);

    // Extract meal ID from the "details" node ID
    const mealId = node.id.slice(-5); // Adjust the index as necessary

    // Fetch meal details using the meal ID
    const mealDetailsData = await fetchIngredientsByMealId(mealId); // Implement this function to fetch details

    // Create a meal details node or just set the details to state
    setMealDetails(mealDetailsData); 
    setSidebarOpen(true); 
}