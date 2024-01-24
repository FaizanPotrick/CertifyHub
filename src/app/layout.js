import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Free UID Certificate Services ",
  description:
    "Experience the convenience of creating and validating UID certificates effortlessly with our website – all completely free of charge. Our user-friendly platform ensures a seamless process for generating and verifying unique identification certificates, offering a secure and efficient solution for your needs. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
