import { useEffect, useState } from "react";
import { getImages } from "../services/meditationApi";

export default function Images() {
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);
    const baseUrl = import.meta.env.BASE_URL;

    useEffect(() => {
        getImages().then((data) => {
            setImages(data);
        });
    }, []);


    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 30000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="carousel-auto">
            {images.map((image, imageIndex) => (
                <img
                    key={image}
                    src={`${baseUrl}images/carousel/${image}`}
                    alt={`Meditazione ${imageIndex + 1}`}
                    className={`carousel-image ${imageIndex === index ? "is-active" : ""}`}
                />
            ))}
        </div>
    );
}
