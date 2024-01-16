import React from "react";
import { addCertificate, addCertificateBasedOnUID } from "@/lib/certificate";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setState, clearState } from "@/redux/features/certificate-slice";
import { setAlert } from "@/redux/features/alert-slice";

function certificateRegister({ GenerateOR }) {
  const dispatch = useAppDispatch();
  const certificate = useAppSelector((state) => state.certificate);

  const onSubmit = async () => {
    try {
      console.log(certificate);

      const res = certificate.isCheck
        ? await addCertificateBasedOnUID(certificate)
        : await addCertificate(certificate);

      console.log(res);
      GenerateOR(res.certificate_number);
      dispatch(clearState());
    } catch (err) {
      dispatch(
        setAlert({
          type: "error",
          id: new Date().getTime(),
          msg: err.message,
        })
      );
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto overflow-hidden rounded-lg shadow-md bg-gray-800 mt-24">
      <div className="px-6 py-4">
        <h3 className="mt-3 text-xl font-medium text-center text-gray-200">
          UID Generator
        </h3>
        <p className="mt-1 text-center text-gray-400">
          For UID certificate generation, simply click the 'Generate' button.
        </p>
        <form className="w-full flex flex-col gap-4 mt-8" action={onSubmit}>
          <input
            type="text"
            value={certificate.name || ""}
            onChange={(e) => dispatch(setState({ name: e.target.value }))}
            className="input"
            placeholder="Name"
            minLength={3}
          />
          <input
            type="text"
            value={certificate.sub_title || ""}
            onChange={(e) => dispatch(setState({ sub_title: e.target.value }))}
            className="input"
            placeholder="Sub Title"
            minLength={2}
          />
          <input
            type="date"
            value={certificate.date || ""}
            onChange={(e) => dispatch(setState({ date: e.target.value }))}
            className="input"
          />
          {certificate?.isCheck && (
            <input
              type="text"
              className="input"
              value={certificate.uid || ""}
              onChange={(e) => dispatch(setState({ uid: e.target.value }))}
              placeholder="Certificate Number"
              minLength={12}
              maxLength={12}
            />
          )}
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              checked={certificate.isCheck || false}
              onChange={(e) =>
                dispatch(setState({ isCheck: e.target.checked }))
              }
              className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-300"
            >
              Do you have certificate number?
            </label>
          </div>
          <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}

export default certificateRegister;
