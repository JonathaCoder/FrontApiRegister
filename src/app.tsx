
import { useEffect,useState,useRef,FormEvent} from "react"
import {FiTrash} from "react-icons/fi"
import { Api } from "./services/api"


interface CustomerProps {
  id:string,
  name:string,
  email:string,
  status:boolean,
  create_at:string
}


export default function App(){
 const [customers,setCurstomer] = useState<CustomerProps[]>([])
 const nameRef = useRef<HTMLInputElement>(null)
 const emailRef = useRef<HTMLInputElement>(null)
  useEffect(()=> {
   loadCustomers()
  },[])

async function loadCustomers() {
   const response = await Api.get("customer")
   setCurstomer(response.data)
   
}

 async function handleSubmite(e:FormEvent){
e.preventDefault();


if(!nameRef.current?.value|| !emailRef.current?.value){
    alert("coloque os dados")
    return
}

const response = await Api.post("/poster",{
  name:nameRef.current?.value,
  email:emailRef.current?.value
})

setCurstomer(allCostumes => [...allCostumes,response.data])

}

async function handleDelete(id:string){
 try {
  await Api.delete("/posterListDelete",{
    params:{
      id:id,
    }
    
  })
  location.reload()
 } catch (error) {
  
 }
}
  return(
    <div className="w-full min-h-screen bg-gray-800 flex justify-center px-4" >
    <main className="my-10 w-full  md:max-w-2xl" >
   <h1 className="text-4xl font-medium text-white">Clientes</h1>

   <form className="flex flex-col my-7" onSubmit={handleSubmite}>
      <label className="text-white font-medium" >Nome:</label>
      <input ref={nameRef} type="text" placeholder="Digite seu nome completo..." className="w-full mb-5 p-2 rounded" />
      <label className="text-white font-medium" >Email:</label>
      <input ref={emailRef} type="email" placeholder="Digite seu nome completo..." className="w-full mb-5 p-2 rounded" />
      <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-400 rounded" />
   </form>

   <section className="flex flex-col  gap-4">
    {customers.map((customer)=>(
      <article key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
      <p><span className="font-medium">Nome:</span> {customer.name}</p>
      <p><span className="font-medium">Email:</span> {customer.email}</p>
      <p><span className="font-medium">Status:</span> {customer.status ? "ATIVO" : "INATIVO"}</p>

      <button onClick={() => handleDelete(customer.id)} className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2" >
        <FiTrash size={18} color="#fff"></FiTrash>
      </button>
    </article>
    ))}
   </section>
    </main>
    </div>
  )
}

