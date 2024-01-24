import React from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deleteAlert } from "@/redux/features/alert-slice";

function Alerts() {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector((state) => state.alerts);

  return (
    <div className="flex flex-col gap-3 fixed bottom-4 left-4 w-full max-w-sm">
      {alerts.map((alert) => {
        return (
          <div
            key={alert.id}
            className="flex justify-between items-center w-full max-w-sm overflow-hidden rounded-lg shadow-md bg-gray-800 pe-3"
          >
            <div className="flex">
              <div className="flex items-center justify-center w-12 bg-red-500">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
              </div>
              <div className="px-1 py-2">
                <div className="mx-3">
                  <span className="font-semibold text-red-400 capitalize">
                    {alert.type}
                  </span>
                  <p className="text-sm text-gray-200 capitalize">
                    {alert.msg}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="p-1 text-gray-500 transition-colors duration-300 transform rounded-md hover:text-white focus:outline-none"
              onClick={() => dispatch(deleteAlert(alert.id))}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Alerts;
