import { useState } from "react";
import "./style.css"
import { IoMdSend } from "react-icons/io";
interface IFormMessage {
    cb: (text: string) => void,
    placeholder: string

}
function FormMessage({ cb, placeholder }: IFormMessage) {

    const [value, setValue] = useState("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (value.trim() !== "") {
            cb(value)
            setValue("")
        }

    }

    return (
        <form className="Form-message" onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} placeholder={placeholder} />
            <label ><IoMdSend size={20} />
                <input type="submit" />
            </label>

        </form>
    )
}

export default FormMessage