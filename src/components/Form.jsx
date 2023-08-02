import {useState, useEffect} from 'react';
import Error from './Error';

function Form({patients, setPatients, patient, setPatient}) {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [checkin, setCheckin] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        if(Object.keys(patient).length > 0){
            setName(patient.name);
            setOwner(patient.owner);
            setEmail(patient.email);
            setCheckin(patient.checkin);
            setSymptoms(patient.symptoms);
        }
    }, [patient])

    const generateId = () => {
        const random = Math.random().toString(36).substr(2);
        const date = Date.now().toString(36);

        return random + date
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Form Validation
        if([name, owner, email, checkin, symptoms].includes('')) {
            setError(true)
            return;
        }

        setError(false)

        //Patient object
        const patientObject = {
            name, 
            owner, 
            email, 
            checkin, 
            symptoms,
        }

        if(patient.id){
            patientObject.id = patient.io;

            const updatedPatients = patients.map(patientState => patientState.id === patient.id ? patientObject : patientState);

            setPatients(updatedPatients)
            setPatient({})
        }else {
            patientObject.id = generateId();
            setPatients([...patients, patientObject]);  
        }

        //Restart form
        setName('')
        setOwner('')
        setEmail('')
        setCheckin('')
        setSymptoms('')
    }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Patients Follow Up</h2>

        <p className="text-lg mt-5 text-center mb-10">Add patients and {' '}
            <span className="text-indigo-600 font-bold">admin them</span>
        </p>

        <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        >
            {error && <Error><p>All fields must be filled</p></Error>}

        <div className="mb-5">
            <label htmlFor="petName" className="block text-grey-700 uppercase font-bold">Pet Name</label>
            <input 
                id="petName" 
                type="text" 
                placeholder="pet name" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="ownerName" className="block text-grey-700 uppercase font-bold">Owner Name</label>
            <input 
                id="ownerName" 
                type="text" 
                placeholder="owner name" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="email" className="block text-grey-700 uppercase font-bold">Email</label>
            <input 
                id="email" 
                type="email" 
                placeholder="email" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="checkIn" className="block text-grey-700 uppercase font-bold">Check in date</label>
            <input 
                id="checkIn" 
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="symptoms" className="block text-grey-700 uppercase font-bold">Symptoms</label>
            <textarea
                id="symptoms" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Describe the symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
            />
        </div>

        <input 
            type="submit"
            value={patient.id ? 'Edit Patient' : 'Add Patient'}
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>
    </div>
  )
}

export default Form
