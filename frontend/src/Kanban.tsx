import React, { useState } from "react";
import { Sortable, MultiDrag, Swap } from "react-sortablejs";
import "./kanban.css"; // Use the CSS you have already with some adjustments

// Data for initial spaces and items
const initialSpaces = [
  {
    id: "space1",
    title: "Inventory",
    items: [
      {
        id: "item1",
        name: "Jollof Rice",
        ingredients: ["Rice", "Tomato", "Red bell pepper", "Onions", "Scotch bonnet pepper", "Vegetable oil", "Seasonings (thyme, curry powder)"],
      },
      {
        id: "item2",
        name: "Egusi Soup",
        ingredients: ["Ground melon seeds (egusi)", "Palm oil", "Leafy vegetables (spinach or bitter leaf)", "Ground crayfish", "Meat (goat, beef, or fish)", "Stock cubes", "Onions"],
      },
      {
        id: "item3",
        name: "Pounded Yam & Egusi",
        ingredients: ["Yam", "Water (for pounding yam)", "Egusi soup (as prepared above)"],
      },
    ],
  },
  {
    id: "space2",
    title: "Kitchen",
    items: [
      {
        id: "item4",
        name: "Suya",
        ingredients: ["Thinly sliced beef or chicken", "Suya spice (kuli kuli, ginger, garlic)", "Onions", "Cucumber", "Tomatoes"],
      },
    ],
  },
  {
    id: "space3",
    title: "Order Fulfilment",
    items: [
      {
        id: "item5",
        name: "Moi Moi",
        ingredients: ["Black-eyed beans", "Red bell peppers", "Onions", "Palm oil", "Eggs (optional)", "Seasonings (salt, bouillon)"],
      },
    ],
  },
];

const Kanban: React.FC = () => {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const handleToggleIngredients = (itemId: string) => {
    setActiveItemId((prev) => (prev === itemId ? null : itemId));
  };

  const handleSortEnd = (spaceId: string, newItems: any) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) =>
        space.id === spaceId ? { ...space, items: newItems } : space
      )
    );
  };

  return (
    <div id="kanban">
      {spaces.map((space) => (
        <div className="space" key={space.id}>
          <h2>{space.title}</h2>
          <Sortable
            tag="div"
            className="items"
            group="shared"
            animation={150}
            list={space.items}
            setList={(newItems: any) => handleSortEnd(space.id, newItems)}
          >
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
                      {item.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </Sortable>
        </div>
      ))}
    </div>
  );
};

export default Kanban;
