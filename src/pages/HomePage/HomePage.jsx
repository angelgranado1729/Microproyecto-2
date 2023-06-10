import { useEffect } from "react";
import "./HomePage";
import { SeatBooking } from "../../components/SeatBooking/SeatBooking";
import { ReservePage } from "../ReservePage/ReservePage";

export function HomePage() {
    return (
        <>
            <p>Landing Page</p>
            <ReservePage />
        </>
    );
}
