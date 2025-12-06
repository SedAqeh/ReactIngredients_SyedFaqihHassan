import { useRef, useState, type ChangeEvent } from "react";
import "./App.css";

interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}
function App() {
  const [title, setTitle] = useState("Title");
  const [editTitle, setEditTitle] = useState(false);
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function TitleHeader() {
    if (!editTitle) {
      return (
        <div className="title-header">
          <h1>{title}</h1>
          <div
            onClick={() => {
              setEditTitle(true);
            }}
          >
            ✏️
          </div>
        </div>
      );
    } else {
      return (
        <div className="title-header">
          <input type="text" ref={inputRef} />
          <button onClick={handleSubmit}>✔️</button>
        </div>
      );
    }
  }

  const handleSubmit = () => {
    setTitle(inputRef.current?.value ?? title);
    setEditTitle(false);
  };

  const listItems = ingredients.map((ingredient: Ingredient) => {
    const { amount, unit, name } = ingredient;

    return (
      <div className="ingredient-item">
        <input
          type="text"
          value={amount}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateIngredientAmount(ingredient, event.target.value);
          }}
          className="ingredient-item-amount"
        />
        <input
          type="text"
          value={unit}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateIngredientUnit(ingredient, event.target.value);
          }}
          className="ingredient-item-unit"
        />
        <input
          type="text"
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateIngredientName(ingredient, event.target.value);
          }}
          className="ingredient-item-name"
        />
        <button
          onClick={() => {
            removeIngredient(ingredient);
          }}
        >
          X
        </button>
      </div>
    );
  });

  function addIngredient() {
    let ingredient: Ingredient = { amount: 0, unit: "", name: "" };

    setIngredients([...ingredients, ingredient]);
  }

  function removeIngredient(ingredient: Ingredient) {
    let newIngredients = ingredients.filter((item) => item !== ingredient);
    setIngredients(newIngredients);
  }

  function updateIngredientName(ingredient: Ingredient, name: string) {
    let newIgredient: Ingredient = { ...ingredient };
    newIgredient.name = name;
    let newIngredients: Array<Ingredient> = ingredients.map((item) => {
      if (item === ingredient) {
        item = newIgredient;
      }
      return item;
    });

    setIngredients(newIngredients);
  }

  function updateIngredientAmount(ingredient: Ingredient, amount: string) {
    let newIgredient: Ingredient = { ...ingredient };
    newIgredient.amount = Number(amount);
    let newIngredients: Array<Ingredient> = ingredients.map((item) => {
      if (item === ingredient) {
        item = newIgredient;
      }
      return item;
    });

    setIngredients(newIngredients);
  }

  function updateIngredientUnit(ingredient: Ingredient, unit: string) {
    let newIgredient: Ingredient = { ...ingredient };
    newIgredient.unit = unit;
    let newIngredients: Array<Ingredient> = ingredients.map((item) => {
      if (item === ingredient) {
        item = newIgredient;
      }
      return item;
    });

    setIngredients(newIngredients);
  }

  return (
    <>
      <div className="page-container">
        {TitleHeader()}
        <div className="ingredients-list"> {listItems}</div>

        <button onClick={addIngredient}>Add ingredient</button>
      </div>
    </>
  );
}

export default App;
