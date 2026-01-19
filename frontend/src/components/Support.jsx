import React from "react";

const Support = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 px-6 py-16">
      <div className="max-w-full mx-auto">

      
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mt-7 text-yellow-400 mb-4">
            Support
          </h1>
          <p className="text-lg text-gray-400">
            We’re here to help you get the best out of Garuda AI
          </p>
        </div>

     
        <section className="mb-10">
          <p className="text-gray-300 leading-relaxed text-lg">
            Garuda AI is designed to be simple, reliable, and efficient. If you
            face any issues or have questions, our support resources are here to
            guide you.
          </p>
        </section>

   
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">
            How Can We Help?
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-gray-300">
                Find quick answers to common questions about usage, features,
                and account-related topics.
              </p>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                Report a Problem
              </h3>
              <p className="text-gray-300">
                Encountered a bug or unexpected behavior? Let us know so we can
                fix it quickly.
              </p>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                Feature Requests
              </h3>
              <p className="text-gray-300">
                Have an idea to improve Garuda AI? We’d love to hear your
                suggestions.
              </p>
            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-200 mb-2">
                Privacy & Security
              </h3>
              <p className="text-gray-300">
                Learn how Garuda AI handles your data and protects your privacy.
              </p>
            </div>
          </div>
        </section>

     
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Contact Support
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            If you need direct assistance, reach out to us through our official
            support channel. We aim to respond as quickly as possible.
          </p>

          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <p className="text-gray-300">
               Email:{" "}
              <span className="text-yellow-400">
                support@garudaai.com
              </span>
            </p>
            <p className="text-gray-300 mt-2">
              Support Hours: Monday – Friday, 10 AM – 6 PM (IST)
            </p>
          </div>
        </section>

   
        <div className="mt-16 text-center text-gray-500">
          <p>
            Need help? Garuda AI support is always here for you.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Support;
