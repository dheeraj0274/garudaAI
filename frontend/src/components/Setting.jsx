const Settings = ({ close }) => {
  return (
    <>
     
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={close}
      />

     
      <div className="fixed inset-0 flex items-center justify-center z-50">
        
        <div className="bg-gray-900 text-white w-[500px] p-6 rounded-xl relative">
          <div className="flex w-full ">
             <div className="bg-zinc-700">

         </div>
         <div className="bg-zinc-600">

         </div>
          </div>

       
         

        </div>

      </div>
    </>
  )
}

export default Settings