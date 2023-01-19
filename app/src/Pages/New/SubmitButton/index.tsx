import { useContext } from "react";
import { IoIosSave } from "react-icons/io";
import { NewContext } from "../../../Contexts/new";

function SubmitButton () {
    const { handleSubmit } = useContext(NewContext);

    return (
        <button className="edit-button" onClick={() => handleSubmit()}>Salvar <IoIosSave id="icon" /></button>
    )
}

export default SubmitButton;
