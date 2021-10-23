import React, {useState} from "react";
import CloseButton from "../../shared/CloseButton";
import SaveButton from "../../shared/SaveButton";

export const MiniIngredientEditPopup = ({ingredientData, onCloseClick, onSaveClick}) => {
    const [inventoryQty, setInventoryQty] = useState(ingredientData.qty);
    const [addSubtractQty, setAddSubtractQty] = useState(0);
    return (
        <div className={"message-modal"}>
            <div className={"vertical-center"}>
                <div className={"edit-mini-ingredient-popup"}>
                    {renderTopBar(ingredientData.name, onCloseClick)}
                    {renderIngredientImage(ingredientData)}
                    {renderInventoryInputField(ingredientData, addSubtractQty, setAddSubtractQty, inventoryQty, setInventoryQty)}
                    {renderAddSubtractField(ingredientData, addSubtractQty, setAddSubtractQty, inventoryQty, setInventoryQty)}
                    {renderSaveButton(ingredientData, inventoryQty, onSaveClick, onCloseClick)}
                </div>
            </div>
        </div>
    );
}


function renderTopBar(name, onCloseClick) {
    return (
        <div className={"edit-mini-ingredient-top-bar"}>
            <span>Edit {name}</span>
            <CloseButton
                onCloseClick={() => onCloseClick()}
            />
        </div>
    );
}

function renderIngredientImage(ingredient) {
    return (
      <div className={"centered-div"}>
          <img
              className={"ingredient-img"}
              src={ingredient.src}
              style={{backgroundImage: 'url("./images/backgrounds/Rarity_' + ingredient.rarity + '_background_cropped.jpg")'}}
              alt={'ingredient image'}
          />
      </div>
    );
}

function renderInventoryInputField(ingredient, addSubtractQty, setAddSubtractQty, inventoryQty, setInventoryQty) {
    return (
        <div className={"input-field-div"}>
            <div className={"centered-div"}>
                <input
                    id={"inventoryInputField"}
                    type={"number"}
                    className={"text-field"}
                    value={inventoryQty}
                    onKeyDown={(event) => {
                        if (event.key === "-") {
                            event.preventDefault();
                        }
                    }}
                    onChange={event => onInventoryInputFieldChange(event.target.value, ingredient.qty, setAddSubtractQty, setInventoryQty)}
                    onFocus={(event) => event.target.select()}
                    onBlur={(event) => resetFieldOnLeave(event.target.value, setInventoryQty)}
                />
            </div>
            <label
                className={"input-label"}
                form={"inventoryInputField"}
            >
                Inventory
            </label>
        </div>
    );
}

function onInventoryInputFieldChange(eventValue, currentInvQty, setAddSubtractQty, setInventoryQty) {
    setInventoryQty(eventValue);
    if (!isNaN(parseInt(eventValue))) {
        setAddSubtractQty(eventValue - currentInvQty);
    }
}

function renderAddSubtractField(ingredient, addSubtractQty, setAddSubtractQty, inventoryQty, setInventoryQty) {
    return (
        <div className={"input-field-div"}>
            <div className={"centered-div"}>
                <input
                    id={"inventoryInputField"}
                    className={"text-field"}
                    type={"number"}
                    value={addSubtractQty}
                    onChange={event => updateOnAddSubtractChange(event.target.value, setAddSubtractQty, ingredient.qty, setInventoryQty)}
                    onFocus={(event) => event.target.select()}
                    onBlur={(event) => resetFieldOnLeave(event.target.value, setAddSubtractQty)}
                />
            </div>
            <label
                className={"input-label"}
                form={"inventoryInputField"}
            >
                Add/Subtract
            </label>
        </div>
    );
}

function updateOnAddSubtractChange(eventValue, setAddSubtractQty, currentInventoryQty, setInventoryQty) {
    const addSubValue = parseInt(eventValue);
    if (!isNaN(addSubValue)) {
        if (currentInventoryQty + addSubValue < 0) {
            setInventoryQty("0");
            setAddSubtractQty(-1 * currentInventoryQty);
        } else {
            setInventoryQty(currentInventoryQty + addSubValue);
            setAddSubtractQty(eventValue);
        }
    } else {
        setInventoryQty(currentInventoryQty);
        setAddSubtractQty(eventValue);
    }
}

function resetFieldOnLeave(value, setter) {
    if (value === "") {
        setter(0);
    }
}

function renderSaveButton(ingredient, inventoryQty, onSaveClick, onCloseClick) {
    return (
        <SaveButton
            onSaveClick={() => {
                onSaveClick(ingredient, inventoryQty);
                onCloseClick();
            }}
        />
    );
}