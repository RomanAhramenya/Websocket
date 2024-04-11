interface IItemProps {
  text: string

  pos: "left" | 'right'
}
import './style.css'

function Item({ text, pos }: IItemProps) {
  return (
    <li className={`Item Item-${pos}`} >
      {text}
    </li>
  )
}
export default Item