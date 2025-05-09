import "@/globals.css";
import { SkeletonTheme } from "react-loading-skeleton";

export const metadata = {
  title: "Inventory Management System",
  description: "Generated by create next app",
};

const RootLayout = async ({ children }) => {
  return (
    <SkeletonTheme baseColor="#d1e0e0" highlightColor="#edf7f6">
      <html lang="en">
        <body className="antialiased w-screen h-screen m-0 p-0">
          <main className="h-full w-full">{children}</main>
        </body>
      </html>
    </SkeletonTheme>
  );
};

export default RootLayout;
