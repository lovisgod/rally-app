// Kanban.tsx
import React, { useRef, useState, useEffect } from "react";
import "./kanban.css";

declare const Sortable: any; // Declare Sortable globally

// Data for initial spaces and items
const initialSpaces = [
  {
    id: "space1",
    title: "Inventory",
    items: [
      { id: "item1", name: "Jollof Rice", ingredients: ["Rice", "Tomato", "Red bell pepper", "Onions", "Scotch bonnet pepper", "Vegetable oil", "Seasonings (thyme, curry powder)"] },
      { id: "item2", name: "Egusi Soup", ingredients: ["Ground melon seeds (egusi)", "Palm oil", "Leafy vegetables (spinach or bitter leaf)", "Ground crayfish", "Meat (goat, beef, or fish)", "Stock cubes", "Onions"] },
      { id: "item3", name: "Pounded Yam & Egusi", ingredients: ["Yam", "Water (for pounding yam)", "Egusi soup (as prepared above)"] },
    ],
  },
  {
    id: "space2",
    title: "Kitchen",
    items: [
      { id: "item4", name: "Suya", ingredients: ["Thinly sliced beef or chicken", "Suya spice (kuli kuli, ginger, garlic)", "Onions", "Cucumber", "Tomatoes"] },
    ],
  },
  {
    id: "space3",
    title: "Order Fulfilment",
    items: [
      { id: "item5", name: "Moi Moi", ingredients: ["Black-eyed beans", "Red bell peppers", "Onions", "Palm oil", "Eggs (optional)", "Seasonings (salt, bouillon)"] },
    ],
  },
];

const Kanban: React.FC = () => {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const spaceRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Initialize Sortable on each space
    spaceRefs.current.forEach((spaceRef, index) => {
      if (spaceRef) {
        new Sortable(spaceRef, {
          group: "shared",
          animation: 150,
          onEnd: (event: any) => {
            const { oldIndex, newIndex } = event;
            const updatedSpaces = [...spaces];
            const [movedItem] = updatedSpaces[index].items.splice(oldIndex, 1);
            updatedSpaces[index].items.splice(newIndex, 0, movedItem);
            setSpaces(updatedSpaces);
          },
        });
      }
    });
  }, [spaces]);

  const handleToggleIngredients = (itemId: string) => {
    setActiveItemId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <div id="kanban">
      {spaces.map((space, index) => (
        <div className="space" key={space.id}>
          <h2>{space.title}</h2>
          <div className="items" ref={(el) => (spaceRefs.current[index] = el)}>
            {space.items.map((item) => (
              <div
                key={item.id}
                className={`item ${activeItemId === item.id ? "active" : ""}`}
                onClick={() => handleToggleIngredients(item.id)}
              >
                <div className="food-name">{item.name}</div>
                {activeItemId === item.id && (
                  <div className="ingredients">
                    <ul>
                      {item.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kanban;
