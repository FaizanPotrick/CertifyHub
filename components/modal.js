import React from "react";
import QRCode from "react-qr-code";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearModal } from "@/redux/features/modal-slice";

export function getURL() {
  const { href } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

function modal() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  return (
    <>
      {modal?.isModalOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center min-h-screen p-4 text-center bg-black/60">
          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform rounded-lg shadow-xl bg-gray-800 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
            <div className="flex justify-center items-center w-full">
              <div className="w-full max-w-[200px] bg-white p-2">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={modal?.url}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 text-white text-sm md:text-base">
              <div className="flex items-start">
                <div className="mx-4 whitespace-nowrap text-gray-400">
                  Certificate Number :
                </div>
                <div className="font-semibold">{modal?.uid}</div>
              </div>
              <div className="flex items-start">
                <div className="mx-4 whitespace-nowrap text-gray-400">
                  Name :
                </div>
                <div>{modal?.name}</div>
              </div>
              <div className="flex items-start">
                <div className="mx-4 whitespace-nowrap text-gray-400">
                  Sub Title :
                </div>
                <div>{modal?.sub_title}</div>
              </div>
              <div className="flex items-start">
                <div className="mx-4 whitespace-nowrap text-gray-400">
                  Date :
                </div>
                <div>{modal?.date}</div>
              </div>
            </div>
            <div className="mt-5 sm:flex sm:items-center">
              <button
                onClick={() => dispatch(clearModal())}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform border rounded-md sm:w-1/2 sm:mx-2 text-gray-200 border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              >
                Cancel
              </button>
              <button className="w-full px-4 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default modal;
