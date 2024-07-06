import { useState } from 'react'

function Contact() {
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
 
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


   // Form Submission
   const handleSubmit = async (e) => {
    e.preventDefault();
        
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
       
  
    } catch (error) {
      console.log("Login issue", error);
    }

   }

  return (
     <div>
         <section className="mx-[20px]">
  <div className="grid grid-cols-12 container md:mx-auto">
    <div className="col-span-full md:col-start-1 md:col-end-9 md:mt-4 md:p-4">
      <div>
        <div className="mt-5 mb-[28px]">
          <div className="font-bold text-center text-xyl">
            <p>
              Drop us a <span className="text-[#00A78E]">line</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#F9FAFB] px-4 pb-3 rounded">
            <div className="">
              <div className="">
                {/* User Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="mt-4">
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="my-4 py-[10px] px-4 rounded-lg"
                    placeholder="Enter Your Name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInput}
                  />
                </div>
                {/* User Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="mt-4">
                    Email*
                  </label>
                  <input
                    type="email"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="email"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                {/* Phone Number */}
                <div className="flex flex-col">
                  <label htmlFor="number" className="mt-4">
                    Phone Number<span>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="number"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </div>

                {/* Company Name */}
                <div className="flex flex-col">
                  <label htmlFor="company" className="mt-4">
                    Company Name <span>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="company"
                    placeholder="Enter Your Company Name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="">
              <div className="mt-4">
                <div className="mb-4">
                  <label htmlFor="services">
                    <span className="font-medium mr-1 text-base">
                      Services You Need
                    </span>
                    (You can choose multiple)
                  </label>
                </div>

                <div className="flex flex-wrap font-medium">
                  <input
                    type="button"
                    value="Mobile Development"
                    onClick={() => addService('Mobile Development', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />

                  <input
                    type="button"
                    value="Software Development"
                    onClick={() => addService('Software Development', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />

                  <input
                    type="button"
                    value="API Integration"
                    onClick={() => addService('API Integration', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />

                  <input
                    type="button"
                    value="SQA Solution"
                    onClick={() => addService('SQA Solution', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />

                  <input
                    type="button"
                    value="Apps Design"
                    onClick={() => addService('Apps Design', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />

                  <input
                    type="button"
                    value="Digital Marketing"
                    onClick={() => addService('Digital Marketing', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />

                  <input
                    type="button"
                    value="Web Development"
                    onClick={() => addService('Web Development', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />

                  <input
                    type="button"
                    value=" Web UX/UI Design"
                    onClick={() => addService(' Web UX/UI Design', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />

                  <input
                    type="button"
                    value="Custom Service"
                    onClick={() => addService('Custom Service', this)}
                    className="not-active px-4 py-2 mb-3 ml-2 rounded-lg"
                  />
                </div>
              </div>

              {/* Detailed Query */}
              <div className="text-base mt-4">
                <div className="mb-4">
                  <label htmlFor="queries" className="form-label">
                    <span className="font-medium mr-1">
                      Deep Details About Your Query
                    </span>
                    (Optional)
                  </label>
                </div>

                <div className="">
                  <textarea
                    className="h-[100px] w-full rounded-lg pt-3 pl-4"
                    placeholder="Tell us more about query"
                    id="queries"
                  ></textarea>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-4">
                <div className="">
                  <label htmlFor="file">
                    <span className="font-medium">Add Attachments</span>
                    (Optional)
                  </label>
                </div>

                <div className="flex items-center justify-between mb-3 border border-gray-300 rounded-lg p-2 bg-[#FFFFFF]">
                  <span className="file-name w-[138px] rounded p-1 overflow-hidden truncate">
                    (a brief, idea, branding guideline, old design....)
                  </span>

                  <input
                    type="file"
                    id="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <label
                    className="file-btn bg-green-500 text-white rounded px-3 py-1"
                    htmlFor="file"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block"
                    >
                      <path
                        d="M14.1016 7.26634L8.09121 13.2768C6.72437 14.6436 4.50829 14.6436 3.14146 13.2768C1.77462 11.9099 1.77462 9.69384 3.14146 8.327L9.15187 2.3166C10.0631 1.40537 11.5405 1.40537 12.4517 2.3166C13.3629 3.22782 13.3629 4.7052 12.4517 5.61643L6.67699 11.3911C6.22138 11.8467 5.48269 11.8467 5.02708 11.3911C4.57147 10.9355 4.57147 10.1968 5.02708 9.74122L10.0947 4.67362"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Add File(5mb)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-10 ml-6">
            <input
              type="submit"
              value="Submit"
              className="flex py-[14px] px-20 bg-[#0060AF] text-white rounded-xl gap-2"
            />
          </div>
        </form>
      </div>
    </div>

    <div className="col-span-full md:col-start-9 md:col-end-13 md:mt-4 md:p-4">
      <div className="company-address">
        <div className="font-bold text-xyl mb-7">
          <p>Contact <span className="text-[#00A78E]">Details</span></p>
        </div>

        <div className="">
          <div className="bang-address p-3 mx-3 my-5 bg-[#F9FAFB] rounded-lg">
            <div className="font-bold text-lg mb-4">
              <p>Bangladesh Address</p>
            </div>
            <div className="text-base font-[450]">
              <div className="flex gap-2 mb-4">
                <i className="fa-solid fa-location-dot mt-1 icons-address"></i>
                <p>18/5 Ring road, Mohammadpur, Dhaka</p>
              </div>
              <div className="flex gap-2 mb-4">
                <i className="fa-solid fa-mobile-android-alt mt-1 icons-address"></i>
                <p>+8801841853611</p>
              </div>
              <div className="flex gap-2 mb-4">
                <i className="fa-solid fa-mailbox mt-1 icons-address"></i>
                <p>contact@cybersecltd.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="bdg-address p-3 mx-3 my-5 bg-[#F9FAFB] rounded-lg">
            <div className="font-bold text-lg mb-4">
              <p>Bangladesh Address</p>
            </div>
            <div className="text-base font-[450]">
              <div className="flex gap-2 mb-4">
                <i className="fa-solid fa-location-dot mt-1 icons-address"></i>
                <p>1225, BDG Road, Mymensingh, Bangladesh</p>
              </div>
              <div className="flex gap-2 mb-4">
                <i className="fa-solid fa-mobile-android-alt mt-1 icons-address"></i>
                <p>+8801841853611</p>
              </div>
              <div className="flex gap-2 mb-4">
                <i className="fa-solid fa-mailbox mt-1 icons-address"></i>
                <p>contact@cybersecltd.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 
     </div>
  )
}

export default Contact