import "./style.css"

interface IList {
    renderItem: (item: any) => any
    list: any[]
}
function List({ list, renderItem }: IList) {
    let uniqueUsers = [...new Set(list.map(item => item.username))];
    console.log(list)
    return (
        <div className="List-container">
            <ul className="List-users">
                <li>В чате:</li>
                {uniqueUsers.map((item, index) => {
                    return <li key={index}>{item}</li>

                })}
            </ul>
            <ul className="List">
                {list.map(item => renderItem(item))}
            </ul>
        </div>

    )
}

export default List