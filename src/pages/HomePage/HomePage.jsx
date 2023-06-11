import { useEffect, useState } from "react";
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
        "src/assets/image1.jpeg",
        "src/assets/image2.jpeg",
        "src/assets/image3.jpeg",
        "src/assets/image4.jpeg",
        "src/assets/image5.jpeg",
      ]);
    }, []);
  
    return (
        <>
            <p>Landing Page</p>
            <ImageCarousel images={images} />
            <p>Landing Page</p>            

        </>
    );
}
