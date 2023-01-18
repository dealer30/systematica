import { GiPencil } from 'react-icons/gi';

function EditPencil(props: any) {
    const handleClick = () => {
        window.location.assign('../system/edit/' + props.uuid);
    }

    return (
        <GiPencil className="edit-pencil" onClick={handleClick} />
    )
}

export default EditPencil;
