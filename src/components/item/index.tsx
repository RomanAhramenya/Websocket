interface IItemProps {
  text: string
  time: string
  bg: string
  pos: "left" | 'right'
}
import './style.css'

function Item({ text, time }: IItemProps) {
  return (
    <div className='Item' >
      <span className='Item-text'>{text}</span>
      <span className='Item-time'>{time}</span>
    </div>
  )
}
export default Item