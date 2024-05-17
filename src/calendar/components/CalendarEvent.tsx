
export const CalendarEvent = (props) => {
    console.log(props);
    
  return (
    <>
        <div className="">
            <strong>{props.event.title}</strong>
        </div>
        <span>{props.event.user.name}</span>
    </>
  )
}
