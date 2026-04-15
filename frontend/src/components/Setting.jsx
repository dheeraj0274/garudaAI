const Settings = ({ close }) => {
  return (
    <>
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={close}
      />

      {/* Modal Box */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        
        <div className="bg-gray-900 text-white w-[500px] p-6 rounded-xl relative">

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-3 right-3"
          >
            ✕
          </button>

          <h2 className="text-lg font-bold mb-4">Settings</h2>

          <p className="text-gray-300">Your settings here...</p>

        </div>

      </div>
    </>
  )
}

export default Settings