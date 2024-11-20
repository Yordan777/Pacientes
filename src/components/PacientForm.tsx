import { useForm } from "react-hook-form"
import Errors from "./Errors";
import { DraftPacient } from "../types";
import { usePacientStore } from "../store";
import { useEffect } from "react";
import { toast } from "react-toastify";


function PacientForm() {

    const { addPacient, activedId, patients, updatePatient } = usePacientStore()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<DraftPacient>()

    useEffect(() => {
        if (activedId) {
            const activedPatient = patients.filter(patient => patient.id === activedId)[0]
            setValue('name', activedPatient.name)
            setValue('date', activedPatient.date)
            setValue('email', activedPatient.email)
            setValue('symptoms', activedPatient.symptoms)
            setValue('caretaker', activedPatient.caretaker)
        }
    }, [activedId])

    const registerPacient = (data: DraftPacient) => {

        if (activedId) {
            updatePatient(data)
            toast.success('Paciente Actualizado Correctamente')
        } else {
            addPacient(data)
            toast.success('Paciente Registrado Correctamente')
        }
        reset()
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes </h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPacient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: 'El nombre del paciente es obligatorio'
                        })}
                    />
                    {errors.name && (
                        <Errors>{errors.name?.message}</Errors>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', {
                            required: 'El propietario es obligatorio'
                        })}
                    />
                    {errors.caretaker && (
                        <Errors>{errors.caretaker?.message}</Errors>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El Email es Obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email No Válido'
                            }
                        })}
                    />
                    {errors.email && (
                        <Errors>{errors.email?.message}</Errors>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'La fecha de alta es obligatoria'
                        })}
                    />
                    {errors.date && (
                        <Errors>{errors.date?.message}</Errors>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', {
                            required: 'los síntomas son obligatorio'
                        })}
                    />
                    {errors.symptoms && (
                        <Errors>{errors.symptoms?.message}</Errors>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Guardar Paciente'
                />
            </form>
        </div>
    )
}

export default PacientForm