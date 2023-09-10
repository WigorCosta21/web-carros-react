import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { getDoc, doc } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "../../components/container";
import { db } from "../../services/firebaseConnection";

interface CarProps {
  id: string;
  name: string;
  model: string;
  city: string;
  year: string;
  km: string;
  description: string;
  created: string;
  price: string | number;
  owner: string;
  uid: string;
  whatsapp: string;
  images: ImagensCarProps[];
}

interface ImagensCarProps {
  uid: string;
  name: string;
  url: string;
}

export const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCar = async () => {
      if (!id) {
        return;
      }

      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        if (!snapshot.data()) {
          navigate("/");
        }

        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          city: snapshot.data()?.year,
          model: snapshot.data()?.model,
          uid: snapshot.data()?.uid,
          description: snapshot.data()?.description,
          created: snapshot.data()?.created,
          whatsapp: snapshot.data()?.whatsapp,
          price: snapshot.data()?.price,
          km: snapshot.data()?.km,
          owner: snapshot.data()?.owner,
          images: snapshot.data()?.images,
        });
      });
    };

    loadCar();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setSliderPerView(1);
      } else {
        setSliderPerView(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      {car && (
        <Swiper
          slidesPerView={sliderPerView}
          pagination={{ clickable: true }}
          navigation
        >
          {car?.images.map((image) => (
            <SwiperSlide key={image.name}>
              <img
                className="w-full h-96 object-cover"
                src={image?.url}
                alt={car?.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {car && (
        <main className="w-full bg-white rounded-lg p-6 my4-">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black">R$ {car?.price}</h1>
          </div>
          <p>{car?.model}</p>
          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p>KM</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>

          <strong>Descrição:</strong>
          <p className="mb-4;">{car?.description}</p>

          <strong>Telefone / Whatsapp:</strong>
          <p>{car?.whatsapp}</p>

          <a
            href={`https://api.whatsapp.com/send?phone${car?.whatsapp}&text=Olá vi esse ${car?.name} no site WebCarros e fiquei interessado!`}
            target="__blank"
            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"
          >
            Conversar com vendedor
            <FaWhatsapp size={26} color="#FFF" />
          </a>
        </main>
      )}
    </Container>
  );
};
