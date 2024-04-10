import { useState } from "react";
import "./style.css"
interface IFormMessage {
    cb: (text: string) => void,
}
function FormMessage({ cb }: IFormMessage) {

    const [value, setValue] = useState("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        cb(value)
    }

    return (
        <form className="Form-message" onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} placeholder="Сообщение" />
            <input type="submit" />
        </form>
    )
}

export default FormMessage