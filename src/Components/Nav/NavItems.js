import "./NavItem.css"

export default function NavItem(props){
  return (
    <div className="wrapper" onClick={props.clicked}>
        <p>{props.Name}</p>
    </div>
  )
}
