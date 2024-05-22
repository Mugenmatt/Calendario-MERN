
interface Props {
  event: {
    title: string;
    user: {
      name: string;
    }
  };
}

export const CalendarEvent = (props: Props) => {
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
