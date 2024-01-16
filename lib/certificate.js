"use server";
import fs from "fs";
import cryptoRandomString from "crypto-random-string";

const uid_length = 12;
const uid_type = "alphanumeric";

const verifyParameter = (parameter, name) => {
  if (parameter == "" || parameter == null) {
    throw new Error(`${name} is empty`);
  }
  return true;
};

const uidGenerator = async (uid) => {
  const certificates = await JSON.parse(
    fs.readFileSync("./_data/certificates.json", "utf-8")
  );
  const newUid = cryptoRandomString({ length: uid_length, type: uid_type });
  return certificates[uid] ? uidGenerator(newUid) : uid;
};

export const addCertificateBasedOnUID = async (data) => {
  const { uid, isCheck, name, sub_title, date } = data;
  if (!isCheck) {
    throw new Error("certificate number is required");
  }
  const certificates = await JSON.parse(
    fs.readFileSync("./_data/certificates.json", "utf-8")
  );
  if (!certificates[uid]) {
    throw new Error("certificate number not exists");
  }

  certificates[uid] = {
    name,
    sub_title,
    date,
    certificate_number: uid,
  };
  fs.writeFileSync("./_data/certificates.json", JSON.stringify(certificates));

  return {
    name,
    sub_title,
    date,
    certificate_number: uid,
  };
};

export const addCertificate = async (data) => {
  const { isCheck, name, sub_title, date } = data;
  if (isCheck) {
    throw new Error("certificate number is not required");
  }
  const certificates = await JSON.parse(
    fs.readFileSync("./_data/certificates.json", "utf-8")
  );

  const uid = cryptoRandomString({ length: uid_length, type: uid_type });
  certificates[uid] = {
    name,
    sub_title,
    date,
    certificate_number: uid,
  };
  fs.writeFileSync("./_data/certificates.json", JSON.stringify(certificates));

  return {
    name,
    sub_title,
    date,
    certificate_number: uid,
  };
};

export const fetchCertificate = async (uid) => {
  const certificates = await JSON.parse(
    fs.readFileSync("./_data/certificates.json", "utf-8")
  );
  if (!certificates[uid]) {
    throw new Error("certificate number not exists");
  }

  return certificates[uid];
};

export const fetchAllCertificate = async () => {
  const certificates = await JSON.parse(
    fs.readFileSync("./_data/certificates.json", "utf-8")
  );

  return Object.values(certificates);
};

export const deleteCertificate = async (uid) => {
  const certificates = await JSON.parse(
    fs.readFileSync("./_data/certificates.json", "utf-8")
  );
  if (!certificates[uid]) {
    throw new Error("certificate number not exists");
  }
  delete certificates[uid];
  fs.writeFileSync("./_data/certificates.json", JSON.stringify(certificates));

  return "certificate deleted";
};
