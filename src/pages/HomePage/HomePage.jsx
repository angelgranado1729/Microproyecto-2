import { useEffect } from "react";
import "./HomePage";
import { SeatBooking } from "../../components/SeatBooking/SeatBooking";
import { ReservePage } from "../ReservePage/ReservePage";
import { fetchMovies } from "../../utils/requests";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";

export function HomePage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
      // Fetch the list of images from the server (remember from firestore)
      setImages([
        "src/assets/images/1.jpg",
        "src/assets/images/2.jpg",
        "src/assets/images/3.jpg",
        "src/assets/images/4.jpg",
        "src/assets/images/5.jpg",
      ]);
    }, []);
  
    return (
        <>
            <p>Landing Page</p>
            <ReservePage />
            <ImageCarousel images={images} />
            <p>Landing Page</p>
            <ReservePage />
            

        </>
    );
}
