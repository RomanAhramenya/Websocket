
import { ReactNode } from "react"
import "./style.css"
interface IChat {
    children: ReactNode
}
function Chat({ children }: IChat) {
    return (
        <div className="Chat">
            {children}
        </div>
    )
}

export default Chat