"use server";
import fs from "fs";
import cryptoRandomString from "crypto-random-string";
import path from "path";

const uid_length = 12;
const uid_type = "alphanumeric";

const filePath = path.join(process.cwd(), "_data/certificates.json");

const verifyParameters = (...params) => {
  for (const param of params) {
    if (param.value == null || param.value === "") {
      throw new Error(`${param.name} is empty or not provided`);
    }
  }
};

const uidGenerator = async (uid) => {
  verifyParameters({ value: uid, name: "uid" });

  const certificates = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const newUid = cryptoRandomString({ length: uid_length, type: uid_type });

  return certificates[uid] ? uidGenerator(newUid) : uid;
};

export const addCertificateBasedOnUID = async (data) => {
  try {
    const { uid, isCheck, name, sub_title, date } = data;

    verifyParameters(
      { value: uid, name: "uid" },
      { value: name, name: "name" },
      { value: sub_title, name: "sub_title" },
      { value: date, name: "date" }
    );

    if (!isCheck) {
      throw new Error("certificate number is required");
    }
    const certificates = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!certificates[uid]) {
      throw new Error("certificate number not exists");
    }

    certificates[uid] = {
      name,
      sub_title,
      date,
      certificate_number: uid,
    };
    fs.writeFileSync(filePath, JSON.stringify(certificates));

    return {
      name,
      sub_title,
      date,
      certificate_number: uid,
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export const addCertificate = async (data) => {
  try {
    const { isCheck, name, sub_title, date } = data;

    verifyParameters(
      { value: name, name: "name" },
      { value: sub_title, name: "sub_title" },
      { value: date, name: "date" }
    );

    if (isCheck) {
      throw new Error("certificate number is not required");
    }
    const certificates = await JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const uid = cryptoRandomString({ length: uid_length, type: uid_type });
    certificates[uid] = {
      name,
      sub_title,
      date,
      certificate_number: uid,
    };
    fs.writeFileSync(filePath, JSON.stringify(certificates));

    return {
      name,
      sub_title,
      date,
      certificate_number: uid,
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export const fetchCertificate = async (uid) => {
  try {
    verifyParameters({ value: uid, name: "uid" });

    const certificates = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!certificates[uid]) {
      throw new Error("certificate number not exists");
    }

    return certificates[uid];
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export const fetchAllCertificate = async () => {
  try {
    const certificates = await JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return Object.values(certificates);
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export const deleteCertificate = async (uid) => {
  try {
    verifyParameters({ value: uid, name: "uid" });

    const certificates = await JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!certificates[uid]) {
      throw new Error("certificate number not exists");
    }
    delete certificates[uid];
    fs.writeFileSync(filePath, JSON.stringify(certificates));

    return "certificate deleted";
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};
