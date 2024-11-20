import { toast } from "react-toastify"
import { usePacientStore } from "../store"
import { Pacient } from "../types"
import PatientDatailItems from "./PatientDatailItems"

type PatientDatailsProps = {
    patient: Pacient
}

export default function PatientDatails({ patient }: PatientDatailsProps) {

    const { deletePatient, getPatientById } = usePacientStore()

    const handleClick = () => {
        deletePatient(patient.id)
        toast.error('Paciente Eliminado')
    }
    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDatailItems label="Nombre" data={patient.name} />
            <PatientDatailItems label="Propietario" data={patient.caretaker} />
            <PatientDatailItems label="Email" data={patient.email} />
            <PatientDatailItems label="Fecha de Alta" data={patient.date.toString()} />
            <PatientDatailItems label="Sintomas" data={patient.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => getPatientById(patient.id)}
                >Editar</button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleClick}
                >Eliminar</button>
            </div>
        </div>
    )
}
