import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUiStore, useCalendarStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');


export const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true)

    const { activeEvent, startSavingEvent } = useCalendarStore();

    const { isDateModalOpen, closeDateModal } = useUiStore();
    
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })
    
    const [formSubmitted, setFormSubmitted] = useState(false)

    const titleClass = useMemo(() =>  {
        if(!formSubmitted) return "";

        return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid';

    }, [formValues.title, formSubmitted])


    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }
    
    const onCloseModal = () => {
        console.log('Cerrando modal');
        closeDateModal()
    }
    
    const onSubmit = async ( event ) => {
        event.preventDefault()
        setFormSubmitted(true);

        const differenceBetweenDates = differenceInSeconds(formValues.end, formValues.start);
        
        // console.log(differenceBetweenDates);

        if(isNaN(differenceBetweenDates) || differenceBetweenDates <= 0) {
            Swal.fire('Error en fechas', 'No es un numero o la diferencia es menor a 0', 'error');
            return;
        }
        if(formValues.title.length <= 0) {
            Swal.fire('', '', 'error');
            return;
        }
        console.log(formValues);

        await startSavingEvent( formValues ) // Crea nuevo evento
        closeDateModal() // Cierra modal
        setFormSubmitted(false); // Quita errores (colores de bordes de inputs)
    }

    useEffect(() => {
        if(activeEvent !== null)  setFormValues({ ...activeEvent });
    
    }, [activeEvent])
    

  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className={'modal'}
        overlayClassName={'modal-fondo'}
        closeTimeoutMS={200}
      >
        <h1> Nuevo Evento </h1>
        <hr />
        <form onSubmit={onSubmit} className="container">
            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker
                    selected={formValues.start}
                    className={`form-control`}
                    onChange={(event) => onDateChange(event, 'start')}
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker
                    minDate={formValues.start}
                    selected={formValues.end}
                    className='form-control'
                    onChange={(event) => onDateChange(event, 'end')}
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    className={`form-control`}
                    placeholder="Notas"
                    rows={5}
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
