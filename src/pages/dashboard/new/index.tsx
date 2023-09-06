import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/painelHeader";
import { Input } from "../../../components/input";

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

export const New = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Container>
      <DashboardHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm: flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32">
          <div className="absolute cursor-pointer">
            <FiUpload size="30" color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
            />
          </div>
        </button>
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
