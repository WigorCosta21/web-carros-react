import { ChangeEvent, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload, FiTrash } from "react-icons/fi";
import { v4 as uuidV4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/painelHeader";
import { Input } from "../../../components/input";
import { AuthContext } from "../../../contexts/AuthContext";
import { storage, db } from "../../../services/firebaseConnection";

const schema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  model: z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O ano é obrigatório"),
  km: z.string().nonempty("O km é obrigatório"),
  price: z.string().nonempty("O preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Número de telefone inválido",
    }),
  description: z.string().nonempty("A descrição é obrigatória"),
});

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export const New = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [carImage, setCarImage] = useState<ImageItemProps[]>([]);

  const onSubmit = (data: FormData) => {
    if (carImage.length === 0) {
      alert("Envie alguma imagem deste carro");
      return;
    }

    const carListImage = carImage.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      };
    });

    addDoc(collection(db, "cars"), {
      name: data.name,
      model: data.model,
      whatsapp: data.whatsapp,
      city: data.city,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImage,
    })
      .then(() => {
        reset();
        setCarImage([]);
        console.log("Cadastrado cm sucesso!");
      })
      .catch((err) => console.log(`Erro ao cadastrar no banco: ${err}`));
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await hadleUpload(image);
      } else {
        alert("Envie uma imagem jpeg ou png!");
        return;
      }
    }
  };

  const hadleUpload = (image: File) => {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        };

        setCarImage((images) => [...images, imageItem]);
      });
    });
  };

  const handleDeleteImage = async (item: ImageItemProps) => {
    const imagePath = `images/${item.uid}/${item.name}`;

    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImage(carImage.filter((car) => car.url !== item.url));
    } catch (err) {
      console.log(`Erro ao deletar: ${err}`);
    }
  };

  return (
    <Container>
      <DashboardHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32">
          <div className="absolute cursor-pointer">
            <FiUpload size="30" color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
        </button>

        {carImage.map((item) => (
          <div
            className="w-full h-32 flex items-center justify-center relative"
            key={item.name}
          >
            <button
              className="absolute"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash size="28" color="#fff" />
            </button>
            <img
              className="rounded-lg w-full h-32 object-cover"
              src={item.previewUrl}
              alt="Foto do carro"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="mb-2 font-medium">Nome do Carro</label>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors?.name?.message}
              placeholder="Ex: Onix 1.0..."
            />
          </div>
          <div className="mb-3">
            <label className="mb-2 font-medium">Modelo do Carro</label>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors?.model?.message}
              placeholder="Ex: 1.0 Flex PLUS Manual..."
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <label className="mb-2 font-medium">Ano</label>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors?.year?.message}
                placeholder="Ex: 2016/2016"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 font-medium">KM rodados</label>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors?.km?.message}
                placeholder="Ex: 2016/2016"
              />
            </div>
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <label className="mb-2 font-medium">Telefone para contato</label>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors?.whatsapp?.message}
                placeholder="Ex: 01199999999"
              />
            </div>
            <div className="w-full">
              <label className="mb-2 font-medium">Cidade</label>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors?.city?.message}
                placeholder="Ex: São Paulo/SP "
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="mb-2 font-medium">Preço</label>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors?.price?.message}
              placeholder="Ex: 69.000"
            />
          </div>
          <div className="mb-3">
            <label className="mb-2 font-medium">Descrição</label>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2"
              {...register("description")}
              name="description"
              id="descripton"
              placeholder="Digite a descrição completa sobre o carro..."
            />
            {errors.description && (
              <p className="mb-1 text-red-500">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-10 rounded-md bg-zinc-900 text-white font-medium"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
};
