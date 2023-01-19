import { useContext } from "react";
import { EditContext } from "../../../Contexts/edit";
import { IoIosSave } from "react-icons/io";

function SubmitButton () {
    const { handleSubmit } = useContext(EditContext);

    return (
        <button className="edit-button" onClick={() => handleSubmit()}>Salvar <IoIosSave id="icon"/></button>
    )
}

export default SubmitButton;
