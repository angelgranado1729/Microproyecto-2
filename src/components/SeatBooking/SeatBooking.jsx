import { useEffect, useState } from 'react';
import styles from "./SeatBooking.module.css";

export function SeatBooking() {
    const maxCapacity = 5;
    const [selectedSeats, setSelectedSeats] = useState([]);


    // Comprobando si las lista de asientos seleccionados contiene el asiento que se le pasa como argumento
    useEffect(() => {
        console.log(selectedSeats);
    }, [selectedSeats]);


    const handleSeatClick = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            if (selectedSeats.length < maxCapacity || selectedSeats.includes(seat)) {
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
                rowSeats.push(
                    <div
                        key={seat}
                        className={`${styles.seat} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
                        onClick={() => !isDisabled && handleSeatClick(seat)}
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

    return (
        <div className={styles['seat-booking-container']}>
            <h2>Seat Booking</h2>
            <div className={styles['seat-map']}>
                <div className={styles['seat-info']}>
                    <p>Selected seats: {selectedSeats.length}</p>
                    <p>Seats available: {maxCapacity - selectedSeats.length}</p>
                </div>
                <div className={styles.screen}>Pantalla</div>
                {renderSeats()}
            </div>
            <div className={styles['selected-seats']}>
                <h3>Selected Seats:</h3>
                {selectedSeats.length === 0 ? <p>No seats selected</p> : selectedSeats.map((seat) => <span key={seat} onClick={() => handleSeatClick(seat)}>{seat}</span>)}
            </div>
        </div>
    );
}
