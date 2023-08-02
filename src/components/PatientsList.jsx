import Patient from "./Patient"

//Coment
function PatientsList({patients, setPatient, deletePatient}) {

  return (
    <div className="md:w-1/2 lg:w-3/5">
        
        {patients && patients.length ? (
            <>
                <h2 className="font-black text-3xl text-center">Patients List</h2>
                <p className="text-xl mt-5 mb-10 text-center">
                    Admin your {' '}
                    <span className="text-indigo-600 font-bold">patients and appointments</span>
                </p>
                <div className="md:h-screen overflow-y-scroll ">
                    {patients.map( patient => (
                        <Patient
                            key={patient.id}
                            patient={patient}
                            setPatient={setPatient}
                            deletePatient={deletePatient}
                        />
                    ))}
                </div>
            </>
        ) : 
            <>
                <h2 className="font-black text-3xl text-center">No Patients</h2>
                <p className="text-xl mt-5 mb-10 text-center">
                    Add patients {' '}
                    <span className="text-indigo-600 font-bold">to be listed</span>
                </p>            
            </>       
        }

        
    </div>
  )
}

export default PatientsList
