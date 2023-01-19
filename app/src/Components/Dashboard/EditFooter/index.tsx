import './index.css'

function EditFooter({ children } : { children: React.ReactNode }) {
    return (
        <footer className="edit-footer">
            { children }
        </footer>
    )
}

export default EditFooter;
