"use client";

import { signIn } from "next-auth/react";

function Page() {
  return (
    <div className="flex flex-col w-screen min-h-screen items-center justify-center">
      <div className="flex flex-col relative md:w-xl lg:w-5xl lg:h-lvh   items-center justify-center  sm:p-14 md:p-36  ">
        <div className='flex md:justify-start md:w-xl  lg:w-5xl lg:h-lvh   p-8 rounded-lg shadow-lg bg-no-repeat    bg-center bg-[url("https://t3.ftcdn.net/jpg/04/85/94/02/360_F_485940219_vemGDyRZMidx9oACruSPO2dAPmO65sEN.webp")]  bg-cover'>
          <div className="flex flex-col justify-center items-center text-center  md:w-1/2">
            <div className="w-max space-y-2">
              <h4 className="text-4xl font-bold text-gray-500 mb-10">
                Log in account
              </h4>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col  items-start">
                  <label>dss</label>
                </div>
                <div className="flex flex-col  items-start">
                  <label>dss</label>
                </div>
              </form>
              <button onClick={() => signIn("google")}>google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
