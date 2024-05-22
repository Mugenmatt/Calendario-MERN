import { addHours } from "date-fns"
import { useUiStore, useCalendarStore } from "../../hooks"

export const FabAddNewEvent = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
              _id: '123',
              name: 'Matías'
            }
          })
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            +
        </button>
    )
}
