import { fetchCategories } from '../API';

export const handleParentNodeClick = async (node, nodes, edges, setNodes, setEdges) => {
      // Fetch categories and create category nodes
      const categories = await fetchCategories();

      const newNodes = categories.map((category, index) => ({
        id: `category-${category.idCategory}`,
        data: {
          label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img width={50} height={50} src={category.strCategoryThumb} alt={category.strCategory} />
              <span style={{ marginLeft: '8px' }}>{category.strCategory}</span>
            </div>
          ),
        },
        position: { x: 300, y: -300 + (index + 1) * 100 },
      }));
      setNodes((prev) => [...prev, ...newNodes]);

      const newEdges = categories.map((category) => ({
        id: `edge-category-${category.idCategory}`,
        source: '1',
        target: `category-${category.idCategory}`,
        type: 'simplebezier',
      }));
      setEdges((prev) => [...prev, ...newEdges]);
}
