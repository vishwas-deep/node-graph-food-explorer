import { fetchMealsByCategory } from "../API";

export const handleViewMealsClick  = async (node, nodes, edges, setNodes, setEdges) => {
    // Filter out previous meal nodes and edges
    const filteredNodes = nodes.filter(elem => !elem.id.startsWith('meal-') && !elem.id.startsWith('ingredient-') && !elem.id.startsWith('tag-') && !elem.id.startsWith('details-') && !elem.id.startsWith('ingredientNode-') && !elem.id.startsWith('tagNode-'));
    const filteredEdges = edges.filter(elem => !elem.id.startsWith('edge-meal-') && !elem.id.startsWith('edge-ingredient-') && !elem.id.startsWith('edge-tag-') && !elem.id.startsWith('edge-details-') && !elem.id.startsWith('edge-tagNode-') && !elem.id.startsWith('edge-ingredientNode-'));

    setNodes(filteredNodes);
    setEdges(filteredEdges);

    // Extract category from the "View Meals" node ID
    const categoryId = node.id.slice(10);

    const categoryLabel = nodes.find(elem => elem.id === categoryId)?.data?.label?.props?.children[1]?.props?.children

    // Fetch top 5 meals for the selected category
    const allMealsByCategory = await fetchMealsByCategory(categoryLabel);

    const newMealsNode = allMealsByCategory.map((meal, index) => ({
      id: `meal-${meal.idMeal}`,
      data: {
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img width={50} height={50} src={meal.strMealThumb} alt={meal.strMeal} />
            <span style={{ marginLeft: '8px' }}>{meal.strMeal}</span>
          </div>
        ),
      },
      position: { x: 900, y: -300 + (index + 1) * 100 }, // Offset position for meal nodes
    }));

    setNodes(prev => [...prev, ...newMealsNode]);

    const newMealsEdges = allMealsByCategory.map((meal) => ({
      id: `edge-meal-${meal.idMeal}`,
      source: node.id,
      target: `meal-${meal.idMeal}`,
      type: 'simplebezier',
    }));
    setEdges(prev => [...prev, ...newMealsEdges]);
}