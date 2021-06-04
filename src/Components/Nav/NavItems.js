import "./NavItem.css"

export default function NavItem(props){
  return (
    <div className="wrapperss" onClick={props.clicked}>
        <p>{props.Name}</p>
    </div>
  )
}
