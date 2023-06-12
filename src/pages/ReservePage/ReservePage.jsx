import { useEffect, useState } from "react";
import { SeatBooking } from "../../components/SeatBooking/SeatBooking";
import { getFuncionById } from "../../utils/fireStoreHelpers";
import { useParams } from "react-router-dom";

export function ReservePage() {
    const { movie_id } = useParams();
    const [asientosOcupados, setAsientosOcupados] = useState([]);
    const [movieId, setMovieId] = useState('');

    //Genera un numero aleatorio entre 1 y 5, incluyendo 3 decimales
    const price = (Math.random() * (5 - 1) + 1).toFixed(3);

    useEffect(() => {
        const getNumberOfSeats = async () => {
            const funcion = await getFuncionById(String(movie_id));
            const asientos = funcion.boletos_vendidos;
            const Id = funcion.movieId;
            setAsientosOcupados(asientos);
            setMovieId(Id);

        };
        getNumberOfSeats();

    }, []);

    return (
        <>
            <h1>Reservación</h1>
            <p>Precio por cada boleto: ${price}</p>
            <SeatBooking asientosOcupados={asientosOcupados} price={price} movieId={String(movieId)} />
        </>
    );
}
