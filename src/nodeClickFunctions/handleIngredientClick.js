import { fetchIngredientsByMealId } from "../API";

export const handleIngredientClick  = async (node, nodes, edges, setNodes, setEdges) => {
    // Filter out previous option nodes for meals
    const filteredNodes = nodes.filter(elem => !elem.id.startsWith('ingredientNode-') && !elem.id.startsWith('tagNode-'));
    const filteredEdges = edges.filter(elem => !elem.id.startsWith('edge-ingredientNode-') && !elem.id.startsWith('EdgeTagNode-'));

    setNodes(filteredNodes);
    setEdges(filteredEdges);

    // Handle View Ingredients node click
    const mealId = node.id.slice(-5); // Extract meal ID
    const data = await fetchIngredientsByMealId(mealId); // Fetch ingredients for the selected meal

    const ingredientsArray = [];

    // Loop through the ingredient properties
    for (let i = 1; i <= 5; i++) {
      const ingredient = data[`strIngredient${i}`]; // Dynamically construct the property name
      if (ingredient) { // Only add non-empty ingredients
        ingredientsArray.push(ingredient);
      }
    }

    // Create ingredient nodes
    const ingredientNodes = ingredientsArray.map((ingredient, index) => ({
      id: `ingredientNode-${ingredient}`,
      data: {
        label: ingredient,
      },
      position: { x: 1300, y: -300 + (index + 1) * 50 }, // Adjust position as needed
    }));

    // Set new ingredient nodes
    setNodes(prev => [...prev, ...ingredientNodes]);

    // Create edges for ingredient nodes
    const ingredientEdges = ingredientsArray.map(ingredient => ({
      id: `edge-ingredientNode-${ingredient}`,
      source: node.id,
      target: `ingredientNode-${ingredient}`,
      type: 'simplebezier',
    }));

    // Set edges for ingredient nodes
    setEdges(prev => [...prev, ...ingredientEdges]);
}