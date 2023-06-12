import { useEffect, useState } from 'react';
import styles from "./SeatBooking.module.css";
import { upDateBoletosVendidos } from '../../utils/fireStoreHelpers';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '../../constants/urls';




export function SeatBooking({ asientosOcupados, price, movieId }) {
    const maxCapacity = 5;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();



    useEffect(() => {
        const calculateTotalPrice = () => {
            const seatsCount = selectedSeats.length;
            const totalPrice = seatsCount * price;
            setTotalPrice(totalPrice);
        };
        calculateTotalPrice();
    }, [selectedSeats, price]);

    const handleSeatClick = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            const isOccupied = asientosOcupados.includes(seat);
            if ((selectedSeats.length < maxCapacity || selectedSeats.includes(seat)) && !isOccupied) {
                setSelectedSeats([...selectedSeats, seat]);
            }
        }
    };

    const isSeatSelected = (seat) => {
        return selectedSeats.includes(seat);
    };

    const renderSeats = () => {
        const rows = ['1', '2', '3', '4', '5'];
        const columns = ['A', 'B', 'C', 'D'];
        const totalSeats = rows.length * columns.length;

        let seatNumber = 1;
        let seatMap = [];

        for (let row of rows) {
            let rowSeats = [];
            for (let col of columns) {
                const seat = `${col}${row}`;
                const isDisabled = seatNumber > totalSeats;
                const isSelected = isSeatSelected(seat);
                const isOccupied = asientosOcupados.includes(seat);
                rowSeats.push(
                    <div
                        key={seat}
                        className={`${styles.seat} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''} ${isOccupied ? styles.occupied : ''}`}
                        onClick={() => !isDisabled && !isOccupied && handleSeatClick(seat)}
                    >
                        {seat}
                    </div>
                );
                seatNumber++;
            }
            seatMap.push(<div className={styles.row} key={row}>{rowSeats}</div>);
        }

        return seatMap;
    };

    const handleConfirmReservation = async () => {

        try {
            await upDateBoletosVendidos(movieId, selectedSeats);
            navigate('/');
            alert(`Ha reservado ${selectedSeats.length} asientos por un total de $${totalPrice.toFixed(3)}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles['seat-booking-container']}>
            <h1>Seat Booking</h1>
            <div className={styles['seat-map']}>
                <div className={styles['seat-info']}>
                    <p>Asientos seleccionados: {selectedSeats.length}</p>
                    <p>Precio a pagar: ${totalPrice.toFixed(3)}</p>
                    <p>Número de asientos disponibles: {maxCapacity - selectedSeats.length}</p>
                </div>
                <div className={styles.screen}>Pantalla</div>
                {renderSeats()}
            </div>
            <div className={styles['selected-seats-container']}>
                <div className={styles['selected-seats']}>
                    {selectedSeats.length === 0 ? (
                        <p className={styles.noSeatsSelected}>No hay sillas seleccionadas</p>
                    ) : (
                        <div className={styles['selected-seats-info']}>
                            <p>Asientos seleccionados</p>
                            {selectedSeats.map((seat) => (
                                <span key={seat} onClick={() => handleSeatClick(seat)}>
                                    {seat}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={`${styles.seat} ${styles.availablelegend}`}></div>
                    <p>Disponible</p>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.seat} ${styles.occupiedlegend}`}></div>
                    <p>Ocupado</p>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.seat} ${styles.selectedlegend}`}></div>
                    <p>Seleccionado</p>
                </div>
            </div>
            {selectedSeats.length === 0 ?
                (
                    <button
                        className={styles.disabledButton}>
                        Selecciona un asiento
                    </button>
                ) :
                (
                    <button onClick={
                        () => handleConfirmReservation()}
                        className={styles.confirmButton}>
                        Confirmar reserva
                    </button>)}
        </div>
    );
}
